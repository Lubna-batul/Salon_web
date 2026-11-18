from fastapi import APIRouter, HTTPException, Path
from sqlalchemy import text

from backend.database import engine
from backend.schemas import StaffPublic

router = APIRouter(prefix="/staff", tags=["staff"])

STAFF_SELECT = """
    SELECT staff_id, staff_name, specialization
    FROM staff
    WHERE status = 'Active'
"""


@router.get("", response_model=list[StaffPublic])
def get_active_staff() -> list[dict]:
    query = text(STAFF_SELECT + " ORDER BY staff_id")
    with engine.connect() as connection:
        rows = connection.execute(query).mappings().all()
    return [dict(row) for row in rows]


@router.get("/{staff_id}", response_model=StaffPublic)
def get_active_staff_member(staff_id: int = Path(gt=0)) -> dict:
    query = text(STAFF_SELECT + " AND staff_id = :staff_id")
    with engine.connect() as connection:
        row = connection.execute(query, {"staff_id": staff_id}).mappings().first()
    if row is None:
        raise HTTPException(status_code=404, detail="Staff member not found.")
    return dict(row)
