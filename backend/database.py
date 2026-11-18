
import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import URL

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(env_path)

database_user = os.getenv("DB_USER")
database_name = os.getenv("DB_NAME")
if not database_user or not database_name:
    raise RuntimeError("DB_USER and DB_NAME must be configured in backend/.env")

try:
    database_port = int(os.getenv("DB_PORT", "3306"))
except ValueError as error:
    raise RuntimeError("DB_PORT must be a valid port number") from error

database_url = URL.create(
    drivername="mysql+pymysql",
    username=database_user,
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST", "localhost"),
    port=database_port,
    database=database_name,
)

engine = create_engine(
    database_url,
    pool_pre_ping=True,
    pool_recycle=1800,
)
