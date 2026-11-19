import re
from pathlib import Path as FilePath

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, event, text
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

from backend import database, main
from backend.catalog_data import SERVICE_CATALOG
from backend.models import Base, ServiceCategory, ServiceType
from backend.routes import academy, customers, enquiries, offers, services, staff


@pytest.fixture
def client(monkeypatch: pytest.MonkeyPatch) -> TestClient:
    test_engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )

    @event.listens_for(test_engine, "connect")
    def register_database_name(connection, record) -> None:
        connection.create_function("DATABASE", 0, lambda: "salon_marketing_test")

    schema = (
        "CREATE TABLE categories (category_id INTEGER PRIMARY KEY, "
        "category_name TEXT NOT NULL, description TEXT)",
        "CREATE TABLE services (service_id INTEGER PRIMARY KEY, "
        "service_name TEXT NOT NULL, description TEXT, category_id INTEGER, "
        "image TEXT, price NUMERIC)",
        "CREATE TABLE customers (customer_id INTEGER PRIMARY KEY AUTOINCREMENT, "
        "name TEXT NOT NULL, email TEXT UNIQUE, phone TEXT NOT NULL)",
        "CREATE TABLE contact_enquiries (enquiry_id INTEGER PRIMARY KEY AUTOINCREMENT, "
        "name TEXT, email TEXT, phone TEXT, message TEXT NOT NULL)",
        "CREATE TABLE academy_courses (course_id INTEGER PRIMARY KEY, "
        "course_name TEXT NOT NULL, description TEXT, duration TEXT, "
        "course_fee NUMERIC, status TEXT)",
        "CREATE TABLE course_enquiries (course_enquiry_id INTEGER PRIMARY KEY AUTOINCREMENT, "
        "course_id INTEGER NOT NULL, student_name TEXT NOT NULL, email TEXT, phone TEXT)",
        "CREATE TABLE offers (offer_id INTEGER PRIMARY KEY, offer_name TEXT NOT NULL, "
        "description TEXT, discount_percentage NUMERIC, start_date DATE, end_date DATE, "
        "is_active INTEGER)",
        "CREATE TABLE staff (staff_id INTEGER PRIMARY KEY, staff_name TEXT NOT NULL, "
        "email TEXT, phone TEXT, specialization TEXT, availability TEXT, status TEXT)",
    )
    with test_engine.begin() as connection:
        for statement in schema:
            connection.execute(text(statement))
        Base.metadata.create_all(connection)
        connection.execute(
            text(
                "INSERT INTO categories VALUES "
                "(1, 'Hair', 'Hair services'), (2, 'Skin', NULL)"
            )
        )
        connection.execute(
            text(
                "INSERT INTO services VALUES "
                "(1, 'Cut', 'Hair cut', 1, 'cut.jpg', 50.00)"
            )
        )
        connection.execute(
            text(
                "INSERT INTO academy_courses VALUES "
                "(1, 'Hair basics', 'Introductory course', 'One day', 100.00, 'Active'), "
                "(2, 'Private course', NULL, NULL, NULL, 'Inactive')"
            )
        )
        connection.execute(
            text(
                "INSERT INTO offers VALUES "
                "(1, 'Current offer', NULL, 10.00, NULL, NULL, 1), "
                "(2, 'Inactive offer', NULL, 5.00, NULL, NULL, 0)"
            )
        )
        connection.execute(
            text(
                "INSERT INTO staff VALUES "
                "(1, 'Public stylist', NULL, NULL, 'Hair', NULL, 'Active'), "
                "(2, 'Inactive stylist', 'private@example.test', '1234567', "
                "'Skin', 'Private schedule', 'Inactive')"
            )
        )

    with Session(test_engine) as session, session.begin():
        for category_id, gender in ((1, "men"), (2, "women")):
            category = ServiceCategory(
                category_id=category_id,
                gender=gender,
                category_name="Haircuts & Styling",
                slug="haircuts-styling",
                description=f"{gender.title()} haircut options.",
                image_path=f"assets/images/{gender}-haircut.jpg",
                image_alt=f"A stylist provides a {gender} haircut.",
                is_active=True,
            )
            session.add(category)
            session.flush()
            for index in range(5):
                session.add(
                    ServiceType(
                        category_id=category_id,
                        service_name=f"{gender.title()} Cut {index + 1}",
                        slug=f"{gender}-cut-{index + 1}",
                        description=f"A distinct {gender} haircut option number {index + 1}.",
                        image_path=category.image_path,
                        image_alt=category.image_alt,
                        verification_status="proposed",
                        is_active=True,
                    )
                )

    for module in (database, main, academy, customers, enquiries, offers, services, staff):
        monkeypatch.setattr(module, "engine", test_engine)

    with TestClient(main.app) as test_client:
        yield test_client
    test_engine.dispose()


def test_health_and_database_health(client: TestClient) -> None:
    assert client.get("/health").json() == {"status": "ok"}
    assert client.get("/health/db").json() == {
        "status": "connected",
        "database": "salon_marketing_test",
    }


def test_frontend_is_served_from_the_api_origin(client: TestClient) -> None:
    home = client.get("/")
    services_page = client.get("/services.html")
    catalog_script = client.get("/catalog.js")

    assert home.status_code == 200
    assert "text/html" in home.headers["content-type"]
    assert services_page.status_code == 200
    assert 'data-services-catalog' in services_page.text
    assert "catalog.js" in services_page.text
    assert catalog_script.status_code == 200
    assert "fetch(path" in catalog_script.text


def test_database_errors_are_sanitized(
    client: TestClient,
    monkeypatch: pytest.MonkeyPatch,
    caplog: pytest.LogCaptureFixture,
) -> None:
    class BrokenEngine:
        def connect(self):
            raise OperationalError(
                "SELECT private data",
                {},
                Exception("internal database details"),
            )

    monkeypatch.setattr(main, "engine", BrokenEngine())
    response = client.get("/health/db")
    assert response.status_code == 503
    assert response.json() == {
        "detail": "The database is temporarily unavailable."
    }
    assert "SELECT private data" not in caplog.text
    assert "internal database details" not in caplog.text


def test_cors_configuration_requires_exact_origins() -> None:
    assert main.parse_cors_origins(
        "http://localhost:5500/, https://evolve.example"
    ) == ["http://localhost:5500", "https://evolve.example"]
    with pytest.raises(RuntimeError):
        main.parse_cors_origins("*")
    with pytest.raises(RuntimeError):
        main.parse_cors_origins("http://localhost:5500/path")


def test_readme_endpoint_inventory_matches_openapi() -> None:
    readme = FilePath(__file__).resolve().parents[1] / "backend" / "README.md"
    documented_paths = set(
        re.findall(
            r"^\|\s+(?:GET|POST)\s+\|\s+`([^`]+)`",
            readme.read_text(encoding="utf-8"),
            flags=re.MULTILINE,
        )
    )
    api_paths = set(main.app.openapi()["paths"])
    assert documented_paths == api_paths
    assert not any(
        path.startswith(("/appointments", "/admin", "/gift-cards"))
        for path in api_paths
    )


def test_public_services_never_include_prices(client: TestClient) -> None:
    response = client.get("/services")
    assert response.status_code == 200
    assert response.json()[0]["service_name"] == "Cut"
    assert set(response.json()[0]) == {
        "service_id",
        "service_name",
        "description",
        "category_id",
        "category_name",
        "image",
    }
    assert client.get("/categories/1").json()["category_name"] == "Hair"
    assert client.get("/categories/1/services").json()[0]["service_id"] == 1
    service_detail = client.get("/services/1").json()
    assert service_detail["service_name"] == "Cut"
    assert "price" not in service_detail
    assert client.get("/services?category_id=1").json()[0]["category_name"] == "Hair"
    assert client.get("/services?category_id=-1").status_code == 422
    assert client.get("/services/9876").status_code == 404
    assert client.get("/services/-1").status_code == 422


def test_service_catalog_is_gender_separated_and_enquiry_only(client: TestClient) -> None:
    men_categories = client.get("/service-categories?gender=men")
    women_categories = client.get("/service-categories?gender=women")

    assert men_categories.status_code == women_categories.status_code == 200
    assert [category["gender"] for category in men_categories.json()] == ["men"]
    assert [category["gender"] for category in women_categories.json()] == ["women"]
    assert men_categories.json()[0]["category_name"] == "Haircuts & Styling"
    assert women_categories.json()[0]["category_name"] == "Haircuts & Styling"

    for gender, categories in (
        ("men", men_categories.json()),
        ("women", women_categories.json()),
    ):
        category_id = categories[0]["category_id"]
        service_types = client.get(
            f"/service-categories/{category_id}/types"
        )
        assert service_types.status_code == 200
        assert len(service_types.json()) == 5
        assert all(item["gender"] == gender for item in service_types.json())
        assert all(item["description"].strip() for item in service_types.json())
        assert all(item["availability_status"] == "enquiry_only" for item in service_types.json())
        assert all("price" not in item for item in service_types.json())

        service_type = service_types.json()[0]
        detail = client.get(f"/service-types/{service_type['service_type_id']}")
        assert detail.status_code == 200
        assert detail.json()["description"] == service_type["description"]

    assert client.get("/service-categories?gender=other").status_code == 422
    assert client.get("/service-categories").status_code == 422
    assert client.get("/service-categories/999/types").status_code == 404
    assert client.get("/service-types/999").status_code == 404
    assert client.get("/service-types/-1").status_code == 422


def test_proposed_catalogue_data_has_five_described_types_per_category() -> None:
    assert set(SERVICE_CATALOG) == {"men", "women"}
    all_descriptions = []
    for categories in SERVICE_CATALOG.values():
        for category in categories:
            types = category["types"]
            assert len(types) >= 5
            assert all(name.strip() and description.strip() for name, description in types)
            assert len({name for name, _ in types}) == len(types)
            all_descriptions.extend(description for _, description in types)
    assert len(set(all_descriptions)) == len(all_descriptions)


def test_categories_include_an_empty_category_successfully(client: TestClient) -> None:
    assert len(client.get("/categories").json()) == 2
    assert client.get("/categories/2/services").json() == []
    assert client.get("/categories/9876").status_code == 404
    assert client.get("/categories/-1").status_code == 422
    assert client.get("/categories/-1/services").status_code == 422


def test_customer_registration_validation_and_duplicate_email(client: TestClient) -> None:
    payload = {
        "name": "Test Customer",
        "email": "guest@example.com",
        "phone": "+1 234 567 8901",
    }
    created = client.post("/customers", json=payload)
    assert created.status_code == 201
    assert set(created.json()) == {"customer_id"}
    duplicate = client.post("/customers", json=payload)
    assert duplicate.status_code == 409
    assert payload["email"] not in duplicate.text
    assert client.post("/customers", json={**payload, "email": "not-an-email"}).status_code == 422
    too_long_email = "a@" + ("b" * 50) + "." + ("c" * 45) + ".com"
    assert len(too_long_email) > 100
    assert client.post("/customers", json={**payload, "email": too_long_email}).status_code == 422
    assert client.post("/customers", json={"name": "Missing phone"}).status_code == 422
    with database.engine.connect() as connection:
        customer_count = connection.execute(
            text("SELECT COUNT(*) FROM customers")
        ).scalar_one()
    assert customer_count == 1


def test_contact_enquiry_is_saved_and_validated(client: TestClient) -> None:
    payload = {
        "name": "Test Guest",
        "email": "guest@example.com",
        "phone": "1234567890",
        "message": "Please contact me.",
    }
    response = client.post("/contact-enquiries", json=payload)
    assert response.status_code == 201
    assert set(response.json()) == {"enquiry_id"}
    assert response.json()["enquiry_id"] > 0
    with database.engine.connect() as connection:
        saved = connection.execute(
            text(
                "SELECT name, email, phone, message FROM contact_enquiries "
                "WHERE enquiry_id = :enquiry_id"
            ),
            {"enquiry_id": response.json()["enquiry_id"]},
        ).mappings().one()
    assert dict(saved) == payload
    optional_phone = client.post(
        "/contact-enquiries",
        json={key: value for key, value in payload.items() if key != "phone"},
    )
    assert optional_phone.status_code == 201
    assert client.post("/contact-enquiries", json={"name": "Missing fields"}).status_code == 422
    assert client.post(
        "/contact-enquiries",
        json={**payload, "email": "not-an-email"},
    ).status_code == 422
    assert client.post(
        "/contact-enquiries",
        json={**payload, "phone": "not-a-phone"},
    ).status_code == 422
    assert client.post(
        "/contact-enquiries",
        json={**payload, "message": "   "},
    ).status_code == 422
    assert client.post(
        "/contact-enquiries",
        json={**payload, "message": "x" * 4001},
    ).status_code == 422
    too_long_email = "a@" + ("b" * 50) + "." + ("c" * 45) + ".com"
    assert client.post(
        "/contact-enquiries",
        json={**payload, "email": too_long_email},
    ).status_code == 422


def test_contact_enquiry_database_errors_are_sanitized(
    client: TestClient,
    monkeypatch: pytest.MonkeyPatch,
    caplog: pytest.LogCaptureFixture,
) -> None:
    class BrokenEngine:
        def begin(self):
            raise OperationalError(
                "INSERT INTO contact_enquiries",
                {},
                Exception("private database details"),
            )

    monkeypatch.setattr(enquiries, "engine", BrokenEngine())
    response = client.post(
        "/contact-enquiries",
        json={
            "name": "Test Guest",
            "email": "guest@example.com",
            "message": "Please contact me.",
        },
    )
    assert response.status_code == 503
    assert response.json() == {
        "detail": "The database is temporarily unavailable."
    }
    assert "INSERT INTO contact_enquiries" not in response.text
    assert "private database details" not in response.text
    assert "INSERT INTO contact_enquiries" not in caplog.text
    assert "private database details" not in caplog.text


def test_academy_courses_and_enquiry(client: TestClient) -> None:
    courses = client.get("/academy/courses")
    assert courses.status_code == 200
    assert [course["course_id"] for course in courses.json()] == [1]
    assert client.get("/academy/courses/1").json()["course_name"] == "Hair basics"
    assert client.get("/academy/courses/2").status_code == 404
    assert client.get("/academy/courses/-1").status_code == 422
    payload = {
        "course_id": 1,
        "student_name": "Test Student",
        "email": "student@example.com",
    }
    created = client.post("/academy/course-enquiries", json=payload)
    assert created.status_code == 201
    assert set(created.json()) == {"course_enquiry_id"}
    assert client.post(
        "/academy/course-enquiries",
        json={"course_id": 1, "student_name": "No contact method"},
    ).status_code == 422
    assert client.post(
        "/academy/course-enquiries",
        json={**payload, "course_id": 9876},
    ).status_code == 404
    with database.engine.connect() as connection:
        enquiry_count = connection.execute(
            text("SELECT COUNT(*) FROM course_enquiries")
        ).scalar_one()
    assert enquiry_count == 1


def test_offers_and_staff_expose_only_public_active_data(client: TestClient) -> None:
    offers_response = client.get("/offers")
    assert [offer["offer_id"] for offer in offers_response.json()] == [1]
    assert client.get("/offers/1").json() == offers_response.json()[0]
    assert client.get("/offers/2").status_code == 404
    assert client.get("/offers/-1").status_code == 422

    public_staff = client.get("/staff").json()
    assert public_staff == [
        {"staff_id": 1, "staff_name": "Public stylist", "specialization": "Hair"}
    ]
    assert client.get("/staff/1").json() == public_staff[0]
    assert client.get("/staff/2").status_code == 404
    assert client.get("/staff/-1").status_code == 422
