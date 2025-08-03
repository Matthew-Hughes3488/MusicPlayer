from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class UserInputModel(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: Optional[str]