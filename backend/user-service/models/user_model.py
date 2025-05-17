from user_input_model import UserInputModel
from pydantic import Field
from typing import Optional
from datetime import datetime

class UserModel(UserInputModel):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None