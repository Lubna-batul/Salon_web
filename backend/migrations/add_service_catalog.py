"""Safely create and seed the separate, enquiry-only service catalogue."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.catalog_data import FOUR_MEN_SERVICE_IMAGES, SERVICE_CATALOG
from backend.database import engine
from backend.models import Base, ServiceCategory, ServiceType


def migrate_and_seed() -> None:
    # create_all only creates missing tables; it does not alter or drop existing ones.
    Base.metadata.create_all(engine)

    with Session(engine) as session, session.begin():
        for gender, categories in SERVICE_CATALOG.items():
            for category_data in categories:
                category = session.scalar(
                    select(ServiceCategory).where(
                        ServiceCategory.gender == gender,
                        ServiceCategory.slug == category_data["slug"],
                    )
                )
                if category is None:
                    category = ServiceCategory(
                        gender=gender,
                        category_name=category_data["name"],
                        slug=category_data["slug"],
                        description=category_data["description"],
                        image_path=category_data["image"],
                        image_alt=category_data["alt"],
                        is_active=True,
                    )
                    session.add(category)
                    session.flush()

                for name, description in category_data["types"]:
                    service_type = session.scalar(
                        select(ServiceType).where(
                            ServiceType.category_id == category.category_id,
                            ServiceType.slug == name.lower().replace(" ", "-").replace("&", "and"),
                        )
                    )
                    if service_type is None:
                        service_type = ServiceType(
                            category_id=category.category_id,
                            service_name=name,
                            slug=name.lower().replace(" ", "-").replace("&", "and"),
                            description=description,
                            image_path=category_data["image"],
                            image_alt=category_data["alt"],
                            verification_status="proposed",
                            is_active=True,
                        )
                        session.add(service_type)
                        session.flush()

                    image_mapping = FOUR_MEN_SERVICE_IMAGES.get(
                        (gender, category_data["name"], name)
                    )
                    if image_mapping is not None:
                        service_type.image_path = image_mapping["image_path"]
                        service_type.image_alt = image_mapping["image_alt"]


if __name__ == "__main__":
    migrate_and_seed()
