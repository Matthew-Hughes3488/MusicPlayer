from pydantic import BaseModel
from typing import Optional

class JWTPayload(BaseModel):
    sub: str                # User ID
    exp: int                # Expiry (timestamp)
    iat: Optional[int]      # Issued at
    role: Optional[str]     # Custom claim (e.g., user role)3