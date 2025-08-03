from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class UserUpdateModel(BaseModel):
    username: Optional[str] = Field(None, description="Unique username")
    email: Optional[str] = Field(None, description="User's email address")
    password: Optional[str] = Field(None, description="User's password. To be hashed before storing.")
    first_name: Optional[str] = Field(None, description="User's first name")
    last_name: Optional[str] = Field(None, description="User's last name")
    updated_at: datetime = Field(default_factory=datetime.utcnow, description="Timestamp of the last update")
    
    class Config:
        orm_mode = True
