from fastapi import FASTAPI, HTTPException
from backend.database import test_connection

app=FASTAPI(
    title="Evolve Studio API",
    description="Backend API for Evolve Studio salon website",
    version="1.0.0"
    )