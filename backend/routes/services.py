from fastapi import APIRouter, HTTPException, Path, Query
from sqlalchemy import text

from backend.database import engine
from backend.schemas import CategoryPublic, ServicePublic

router = APIRouter(tags=["services"])

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
