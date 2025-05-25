from models.user_input_model import UserInputModel
from typing import Optional
from datetime import datetime

class UserModel(UserInputModel):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None