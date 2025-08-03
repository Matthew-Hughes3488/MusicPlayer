from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.auth_service.auth_service import AuthService
from backend.auth_service.model.auth_models import LoginResponse, LoginRequest
import os
from dotenv import load_dotenv
load_dotenv()  # Load environment variables from .env file

router = APIRouter()
auth_service = AuthService(user_service_url=os.getenv("USER_SERVICE_URL", "http://localhost:8000"))

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """
    Authenticates the user via the user service.
    If successfull help me create an exceptions fill, returns a JWT and expiry metadata.
    """
    try:
        response = auth_service.login(request)
        if not response:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))