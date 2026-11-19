import os

import pytest
from fastapi.testclient import TestClient

from backend.main import app

pytestmark = pytest.mark.skipif(
    os.getenv("RUN_MYSQL_READONLY_TESTS") != "1",
    reason="Set RUN_MYSQL_READONLY_TESTS=1 to run read-only MySQL integration tests.",
)


def test_public_endpoints_against_mysql_without_writes() -> None:
    with TestClient(app) as client:
        health = client.get("/health/db")
        assert health.status_code == 200
        assert health.json() == {"status": "connected", "database": "salon_marketing"}

        categories = client.get("/categories")
        services = client.get("/services")
        courses = client.get("/academy/courses")
        offers = client.get("/offers")
        staff = client.get("/staff")

        for response in (categories, services, courses, offers, staff):
            assert response.status_code == 200
            assert isinstance(response.json(), list)

        for gender in ("men", "women"):
            service_categories = client.get(
                "/service-categories",
                params={"gender": gender},
            )
            assert service_categories.status_code == 200
            assert service_categories.json()
            assert all(
                category["gender"] == gender
                for category in service_categories.json()
            )
            for category in service_categories.json():
                service_types = client.get(
                    f"/service-categories/{category['category_id']}/types"
                )
                assert service_types.status_code == 200
                assert len(service_types.json()) >= 5
                for service_type in service_types.json():
                    assert service_type["description"].strip()
                    assert service_type["availability_status"] == "enquiry_only"
                    detail = client.get(
                        f"/service-types/{service_type['service_type_id']}"
                    )
                    assert detail.status_code == 200
                    assert detail.json()["description"] == service_type["description"]

        if categories.json():
            category_id = categories.json()[0]["category_id"]
            assert client.get(f"/categories/{category_id}").status_code == 200
            category_services = client.get(
                f"/categories/{category_id}/services"
            )
            assert category_services.status_code == 200
            assert client.get(f"/services?category_id={category_id}").status_code == 200

        if services.json():
            service_id = services.json()[0]["service_id"]
            service_detail = client.get(f"/services/{service_id}")
            assert service_detail.status_code == 200
            assert "price" not in service_detail.json()

        if courses.json():
            course_id = courses.json()[0]["course_id"]
            assert client.get(f"/academy/courses/{course_id}").status_code == 200

        for service in services.json():
            assert set(service) == {
                "service_id",
                "service_name",
                "description",
                "category_id",
                "category_name",
                "image",
            }

        for person in staff.json():
            assert set(person) == {"staff_id", "staff_name", "specialization"}

        if offers.json():
            offer_id = offers.json()[0]["offer_id"]
            detail = client.get(f"/offers/{offer_id}")
            assert detail.status_code == 200
            assert set(detail.json()) == set(offers.json()[0])

        if staff.json():
            staff_id = staff.json()[0]["staff_id"]
            detail = client.get(f"/staff/{staff_id}")
            assert detail.status_code == 200
            assert set(detail.json()) == set(staff.json()[0])

        assert client.get("/categories/2147483647").status_code == 404
        assert client.get("/services/2147483647").status_code == 404
