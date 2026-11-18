from fastapi import APIRouter, HTTPException, status
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError

from backend.database import engine
from backend.schemas import CustomerCreate, CustomerCreated

router = APIRouter(prefix="/customers", tags=["customers"])


@router.post("", response_model=CustomerCreated, status_code=status.HTTP_201_CREATED)
def register_customer(customer: CustomerCreate) -> dict[str, int]:
    try:
        with engine.begin() as connection:
            result = connection.execute(
                text(
                    "INSERT INTO customers (name, email, phone) "
                    "VALUES (:name, :email, :phone)"
                ),
                {
                    "name": customer.name,
                    "email": str(customer.email) if customer.email else None,
                    "phone": customer.phone,
                },
            )
    except IntegrityError as error:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="The customer registration conflicts with existing data.",
        ) from error
    return {"customer_id": result.lastrowid}
