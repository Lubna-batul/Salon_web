from fastapi import APIRouter, status
from sqlalchemy import text

from backend.database import engine
from backend.schemas import ContactEnquiryCreate, EnquiryCreated

router = APIRouter(prefix="/contact-enquiries", tags=["enquiries"])


@router.post("", response_model=EnquiryCreated, status_code=status.HTTP_201_CREATED)
def create_contact_enquiry(enquiry: ContactEnquiryCreate) -> dict[str, int]:
    with engine.begin() as connection:
        result = connection.execute(
            text(
                "INSERT INTO contact_enquiries (name, email, phone, message) "
                "VALUES (:name, :email, :phone, :message)"
            ),
            {
                "name": enquiry.name,
                "email": str(enquiry.email),
                "phone": enquiry.phone,
                "message": enquiry.message,
            },
        )
    return {"enquiry_id": result.lastrowid}
