import re
from datetime import date
from decimal import Decimal

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    field_validator,
    model_validator,
)


class APIModel(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)


def validate_phone(phone: str | None) -> str | None:
    if phone is None:
        return None
    if not re.fullmatch(r"[+0-9(). -]{7,15}", phone) or sum(
        character.isdigit() for character in phone
    ) < 7:
        raise ValueError("Enter a valid phone number.")
    return phone


class CategoryPublic(APIModel):
    category_id: int
    category_name: str
    description: str | None


class ServicePublic(APIModel):
    service_id: int
    service_name: str
    description: str | None
    category_id: int | None
    category_name: str | None
    image: str | None


class CustomerCreate(APIModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr | None = Field(default=None, max_length=100)
    phone: str = Field(min_length=7, max_length=15)

    @field_validator("phone")
    @classmethod
    def phone_is_valid(cls, value: str) -> str:
        return validate_phone(value) or value


class CustomerCreated(APIModel):
    customer_id: int


class ContactEnquiryCreate(APIModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr = Field(max_length=100)
    phone: str | None = Field(default=None, max_length=15)
    message: str = Field(min_length=1, max_length=4000)

    @field_validator("phone")
    @classmethod
    def phone_is_valid(cls, value: str | None) -> str | None:
        return validate_phone(value)


class EnquiryCreated(APIModel):
    enquiry_id: int


class AcademyCoursePublic(APIModel):
    course_id: int
    course_name: str
    description: str | None
    duration: str | None
    course_fee: Decimal | None


class CourseEnquiryCreate(APIModel):
    course_id: int = Field(gt=0)
    student_name: str = Field(min_length=1, max_length=100)
    email: EmailStr | None = Field(default=None, max_length=100)
    phone: str | None = Field(default=None, max_length=15)

    @field_validator("phone")
    @classmethod
    def phone_is_valid(cls, value: str | None) -> str | None:
        return validate_phone(value)

    @model_validator(mode="after")
    def has_contact_method(self) -> "CourseEnquiryCreate":
        if self.email is None and self.phone is None:
            raise ValueError("Provide an email address or phone number.")
        return self


class CourseEnquiryCreated(APIModel):
    course_enquiry_id: int


class OfferPublic(APIModel):
    offer_id: int
    offer_name: str
    description: str | None
    discount_percentage: Decimal | None
    start_date: date | None
    end_date: date | None


class StaffPublic(APIModel):
    staff_id: int
    staff_name: str
    specialization: str | None
