import logging
import os
from pathlib import Path
from urllib.parse import urlsplit

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from backend.database import engine
from backend.routes.academy import router as academy_router
from backend.routes.customers import router as customers_router
from backend.routes.enquiries import router as enquiries_router
from backend.routes.offers import router as offers_router
from backend.routes.services import router as services_router
from backend.routes.staff import router as staff_router

logger = logging.getLogger(__name__)


def parse_cors_origins(value: str) -> list[str]:
    origins: list[str] = []
    for configured_origin in value.split(","):
        origin = configured_origin.strip()
        if not origin:
            continue
        if origin.endswith("/"):
            origin = origin[:-1]
        parsed = urlsplit(origin)
        if (
            origin == "*"
            or parsed.scheme not in {"http", "https"}
            or not parsed.hostname
            or parsed.username is not None
            or parsed.password is not None
            or parsed.path
            or parsed.query
            or parsed.fragment
        ):
            raise RuntimeError(
                "CORS_ORIGINS must contain exact HTTP or HTTPS origins."
            )
        try:
            parsed.port
        except ValueError as error:
            raise RuntimeError(
                "CORS_ORIGINS contains an invalid port."
            ) from error
        origins.append(origin)
    return origins


app = FastAPI(
    title="Evolve Studio API",
    description="Public API for Evolve Studio salon information and enquiries.",
    version="1.0.0",
)

configured_origins = parse_cors_origins(os.getenv("CORS_ORIGINS", ""))
if configured_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=configured_origins,
        allow_credentials=False,
        allow_methods=["GET", "POST"],
        allow_headers=["Content-Type"],
    )

app.include_router(services_router)
app.include_router(customers_router)
app.include_router(enquiries_router)
app.include_router(academy_router)
app.include_router(offers_router)
app.include_router(staff_router)


@app.exception_handler(SQLAlchemyError)
async def handle_database_error(
    request: Request, error: SQLAlchemyError
) -> JSONResponse:
    logger.error("Database operation failed (%s)", type(error).__name__)
    return JSONResponse(
        status_code=503,
        content={"detail": "The database is temporarily unavailable."},
    )


@app.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/health/db", tags=["health"])
def check_database() -> dict[str, str]:
    with engine.connect() as connection:
        database_name = connection.execute(text("SELECT DATABASE()")).scalar_one()
    return {"status": "connected", "database": database_name}


frontend_directory = Path(__file__).resolve().parent.parent / "frontend"
app.mount(
    "/",
    StaticFiles(directory=str(frontend_directory), html=True),
    name="frontend",
)
