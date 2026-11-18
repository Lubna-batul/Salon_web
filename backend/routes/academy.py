from fastapi import APIRouter, HTTPException, Path, status
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError

from backend.database import engine
from backend.schemas import (
    AcademyCoursePublic,
    CourseEnquiryCreate,
    CourseEnquiryCreated,
)

router = APIRouter(prefix="/academy", tags=["academy"])

COURSE_SELECT = """
    SELECT course_id, course_name, description, duration, course_fee
    FROM academy_courses
    WHERE status = 'Active'
"""


@router.get("/courses", response_model=list[AcademyCoursePublic])
def get_courses() -> list[dict]:
    with engine.connect() as connection:
        rows = connection.execute(
            text(COURSE_SELECT + " ORDER BY course_id")
        ).mappings().all()
    return [dict(row) for row in rows]


@router.get("/courses/{course_id}", response_model=AcademyCoursePublic)
def get_course(course_id: int = Path(gt=0)) -> dict:
    with engine.connect() as connection:
        row = connection.execute(
            text(COURSE_SELECT + " AND course_id = :course_id"),
            {"course_id": course_id},
        ).mappings().first()
    if row is None:
        raise HTTPException(status_code=404, detail="Course not found.")
    return dict(row)


@router.post(
    "/course-enquiries",
    response_model=CourseEnquiryCreated,
    status_code=status.HTTP_201_CREATED,
)
def create_course_enquiry(enquiry: CourseEnquiryCreate) -> dict[str, int]:
    try:
        with engine.begin() as connection:
            course_exists = connection.execute(
                text(
                    "SELECT 1 FROM academy_courses "
                    "WHERE course_id = :course_id AND status = 'Active'"
                ),
                {"course_id": enquiry.course_id},
            ).scalar_one_or_none()
            if course_exists is None:
                raise HTTPException(status_code=404, detail="Course not found.")
            result = connection.execute(
                text(
                    "INSERT INTO course_enquiries "
                    "(course_id, student_name, email, phone) "
                    "VALUES (:course_id, :student_name, :email, :phone)"
                ),
                {
                    "course_id": enquiry.course_id,
                    "student_name": enquiry.student_name,
                    "email": str(enquiry.email) if enquiry.email else None,
                    "phone": enquiry.phone,
                },
            )
    except IntegrityError as error:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="The enquiry conflicts with existing data.",
        ) from error
    return {"course_enquiry_id": result.lastrowid}
