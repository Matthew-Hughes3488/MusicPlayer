from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class UserInputModel(BaseModel):
    username: str = Field(..., description="Unique username")
    email: str = Field(..., description="User's email address")
    password: str = Field(..., description="User's password. To be hashed before storing.")
    first_name: str = Field(..., description="User's first name")
    last_name: Optional[str] = Field(None, description="User's last name")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Creation timestamp")