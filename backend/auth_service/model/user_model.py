from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserModel(BaseModel):
    id: int
    username: str
    email: str
    password_hash: str
    first_name: str
    last_name: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        orm_mode = True