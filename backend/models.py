from sqlalchemy import Boolean, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class ServiceCategory(Base):
    __tablename__ = "service_categories"
    __table_args__ = (
        UniqueConstraint("gender", "slug", name="uq_service_category_gender_slug"),
    )

    category_id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    gender: Mapped[str] = mapped_column(String(10), nullable=False)
    category_name: Mapped[str] = mapped_column(String(120), nullable=False)
    slug: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    image_path: Mapped[str | None] = mapped_column(String(255))
    image_alt: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    service_types: Mapped[list["ServiceType"]] = relationship(
        back_populates="category",
        cascade="save-update, merge",
    )


class ServiceType(Base):
    __tablename__ = "service_types"
    __table_args__ = (
        UniqueConstraint("category_id", "slug", name="uq_service_type_category_slug"),
    )

    service_type_id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True
    )
    category_id: Mapped[int] = mapped_column(
        ForeignKey("service_categories.category_id", ondelete="RESTRICT"),
        nullable=False,
    )
    service_name: Mapped[str] = mapped_column(String(120), nullable=False)
    slug: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    image_path: Mapped[str | None] = mapped_column(String(255))
    image_alt: Mapped[str] = mapped_column(String(255), nullable=False)
    verification_status: Mapped[str] = mapped_column(
        String(24), nullable=False, default="proposed"
    )
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    category: Mapped[ServiceCategory] = relationship(back_populates="service_types")
