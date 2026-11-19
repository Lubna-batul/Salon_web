from fastapi import APIRouter, HTTPException, Path, Query
from sqlalchemy import text
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.database import engine
from backend.models import ServiceCategory, ServiceType
from backend.schemas import (
    CategoryPublic,
    ServiceCategoryCatalogPublic,
    ServicePublic,
    ServiceTypePublic,
)

router = APIRouter(tags=["services"])


@router.get(
    "/service-categories",
    response_model=list[ServiceCategoryCatalogPublic],
)
def get_service_categories(
    gender: str = Query(pattern="^(men|women)$"),
) -> list[dict]:
    with Session(engine) as session:
        rows = session.execute(
            select(
                ServiceCategory.category_id,
                ServiceCategory.gender,
                ServiceCategory.category_name,
                ServiceCategory.slug,
                ServiceCategory.description,
                ServiceCategory.image_path,
                ServiceCategory.image_alt,
            )
            .where(
                ServiceCategory.gender == gender,
                ServiceCategory.is_active.is_(True),
            )
            .order_by(ServiceCategory.category_id)
        ).mappings().all()
    return [dict(row) for row in rows]


@router.get(
    "/service-categories/{category_id}/types",
    response_model=list[ServiceTypePublic],
)
def get_service_types_for_category(
    category_id: int = Path(gt=0),
) -> list[dict]:
    with Session(engine) as session:
        category = session.get(ServiceCategory, category_id)
        if category is None or not category.is_active:
            raise HTTPException(status_code=404, detail="Service category not found.")
        rows = session.execute(
            select(
                ServiceType.service_type_id,
                ServiceType.category_id,
                ServiceCategory.category_name,
                ServiceCategory.gender,
                ServiceType.service_name,
                ServiceType.description,
                ServiceType.image_path,
                ServiceType.image_alt,
            )
            .join(
                ServiceCategory,
                ServiceType.category_id == ServiceCategory.category_id,
            )
            .where(
                ServiceType.category_id == category_id,
                ServiceType.is_active.is_(True),
                ServiceCategory.is_active.is_(True),
            )
            .order_by(ServiceType.service_type_id)
        ).mappings().all()
    return [
        {**dict(row), "availability_status": "enquiry_only"}
        for row in rows
    ]


@router.get("/service-types/{service_type_id}", response_model=ServiceTypePublic)
def get_service_type(service_type_id: int = Path(gt=0)) -> dict:
    with Session(engine) as session:
        row = session.execute(
            select(
                ServiceType.service_type_id,
                ServiceType.category_id,
                ServiceCategory.category_name,
                ServiceCategory.gender,
                ServiceType.service_name,
                ServiceType.description,
                ServiceType.image_path,
                ServiceType.image_alt,
            )
            .join(
                ServiceCategory,
                ServiceType.category_id == ServiceCategory.category_id,
            )
            .where(
                ServiceType.service_type_id == service_type_id,
                ServiceType.is_active.is_(True),
                ServiceCategory.is_active.is_(True),
            )
        ).mappings().first()
    if row is None:
        raise HTTPException(status_code=404, detail="Service type not found.")
    return {**dict(row), "availability_status": "enquiry_only"}


SERVICE_SELECT = """
    SELECT
        s.service_id,
        s.service_name,
        s.description,
        s.category_id,
        c.category_name,
        s.image
    FROM services AS s
    LEFT JOIN categories AS c ON s.category_id = c.category_id
"""


@router.get("/categories", response_model=list[CategoryPublic])
def get_categories() -> list[dict]:
    query = text(
        "SELECT category_id, category_name, description "
        "FROM categories ORDER BY category_id"
    )
    with engine.connect() as connection:
        rows = connection.execute(query).mappings().all()
    return [dict(row) for row in rows]


@router.get("/categories/{category_id}", response_model=CategoryPublic)
def get_category(category_id: int = Path(gt=0)) -> dict:
    query = text(
        "SELECT category_id, category_name, description "
        "FROM categories WHERE category_id = :category_id"
    )
    with engine.connect() as connection:
        row = connection.execute(query, {"category_id": category_id}).mappings().first()
    if row is None:
        raise HTTPException(status_code=404, detail="Category not found.")
    return dict(row)


@router.get(
    "/categories/{category_id}/services",
    response_model=list[ServicePublic],
)
def get_services_for_category(category_id: int = Path(gt=0)) -> list[dict]:
    with engine.connect() as connection:
        exists = connection.execute(
            text("SELECT 1 FROM categories WHERE category_id = :category_id"),
            {"category_id": category_id},
        ).scalar_one_or_none()
        if exists is None:
            raise HTTPException(status_code=404, detail="Category not found.")
        rows = connection.execute(
            text(SERVICE_SELECT + " WHERE s.category_id = :category_id ORDER BY s.service_id"),
            {"category_id": category_id},
        ).mappings().all()
    return [dict(row) for row in rows]


@router.get("/services", response_model=list[ServicePublic])
def get_services(
    category_id: int | None = Query(default=None, gt=0),
) -> list[dict]:
    query = SERVICE_SELECT
    parameters: dict[str, int] = {}
    if category_id is not None:
        query += " WHERE s.category_id = :category_id"
        parameters["category_id"] = category_id
    query += " ORDER BY s.service_id"
    with engine.connect() as connection:
        rows = connection.execute(text(query), parameters).mappings().all()
    return [dict(row) for row in rows]


@router.get("/services/{service_id}", response_model=ServicePublic)
def get_service(service_id: int = Path(gt=0)) -> dict:
    query = text(SERVICE_SELECT + " WHERE s.service_id = :service_id")
    with engine.connect() as connection:
        row = connection.execute(query, {"service_id": service_id}).mappings().first()
    if row is None:
        raise HTTPException(status_code=404, detail="Service not found.")
    return dict(row)
