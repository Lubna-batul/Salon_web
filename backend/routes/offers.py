from fastapi import APIRouter, HTTPException, Path
from sqlalchemy import text

from backend.database import engine
from backend.schemas import OfferPublic

router = APIRouter(prefix="/offers", tags=["offers"])

OFFER_SELECT = """
    SELECT offer_id, offer_name, description, discount_percentage,
           start_date, end_date
    FROM offers
    WHERE is_active = 1
      AND (start_date IS NULL OR start_date <= CURRENT_DATE)
      AND (end_date IS NULL OR end_date >= CURRENT_DATE)
"""


@router.get("", response_model=list[OfferPublic])
def get_active_offers() -> list[dict]:
    query = text(OFFER_SELECT + " ORDER BY offer_id")
    with engine.connect() as connection:
        rows = connection.execute(query).mappings().all()
    return [dict(row) for row in rows]


@router.get("/{offer_id}", response_model=OfferPublic)
def get_active_offer(offer_id: int = Path(gt=0)) -> dict:
    query = text(OFFER_SELECT + " AND offer_id = :offer_id")
    with engine.connect() as connection:
        row = connection.execute(query, {"offer_id": offer_id}).mappings().first()
    if row is None:
        raise HTTPException(status_code=404, detail="Offer not found.")
    return dict(row)
