from pydantic import BaseModel
from typing import Optional

class JWTPayload(BaseModel):
    sub: str                # User ID
    name: Optional[str]
    email: Optional[str]
    exp: int                # Expiry (timestamp)
    iat: Optional[int]      # Issued at
    role: Optional[str]     # Custom claim (e.g., user role)3