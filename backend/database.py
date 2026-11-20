
import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import URL

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(env_path)

environment = os.getenv("ENVIRONMENT", "development").strip().lower()
if environment not in {"development", "testing", "production"}:
    raise RuntimeError(
        "ENVIRONMENT must be one of: development, testing, production"
    )

database_user = os.getenv("DB_USER")
database_name = os.getenv("DB_NAME")
if not database_user or not database_name:
    raise RuntimeError(
        "DB_USER and DB_NAME must be configured through environment variables"
    )
database_password = os.getenv("DB_PASSWORD")
if environment == "production" and not database_password:
    raise RuntimeError("DB_PASSWORD must be configured in production")

try:
    database_port = int(os.getenv("DB_PORT", "3306"))
except ValueError as error:
    raise RuntimeError("DB_PORT must be a valid port number") from error

database_url = URL.create(
    drivername="mysql+pymysql",
    username=database_user,
    password=database_password,
    host=os.getenv("DB_HOST", "localhost"),
    port=database_port,
    database=database_name,
)

ssl_ca = os.getenv("DB_SSL_CA")
engine_options: dict[str, object] = {
    "pool_pre_ping": True,
    "pool_recycle": 1800,
}
if ssl_ca:
    engine_options["connect_args"] = {"ssl": {"ca": ssl_ca}}

engine = create_engine(
    database_url,
    **engine_options,
)
