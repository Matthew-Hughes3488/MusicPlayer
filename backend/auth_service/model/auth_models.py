from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class LoginRequest(BaseModel):
    email: str = Field(..., description="User's email address")
    password: str = Field(..., description="User's password")

class LoginResponse(BaseModel):
    auth_token: str = Field(..., description="JWT token for authenticated user")
    user_id: int = Field(..., description="ID of the authenticated user")
    username: str = Field(..., description="Username of the authenticated user")
    email: str = Field(..., description="Email of the authenticated user")
    role: Optional[str] = Field("user", description="Role of the authenticated user (e.g., admin, user)")

class LogoutResponse(BaseModel):
    message: str = Field(..., description="Message indicating successful logout")