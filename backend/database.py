import os

from dotenv import load_dotenv

from dotenv import load_dotenv,  load_dotenv
from pymysql import connect
from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL

load_dotenv()

database_url= URL.create(
    drivername=os.getenv("DB_DRIVER"),
    username=os.getenv("DB_USERNAME"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
    database=os.getenv("DB_NAME")
)
engine=create_engine(
    database_url, pool_pre_ping=True
    )
def test_connection():
    with engine,connect() as connection:
        result=connection.execute(text("SELECT DATABASE()")
        )
        return result.scalar_one()
        



     