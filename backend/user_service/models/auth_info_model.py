from pydantic import BaseModel
from typing import Optional

class AuthInfoModel(BaseModel):
    user_id: int
    password_hash: str
    role: Optional[str] = "user"