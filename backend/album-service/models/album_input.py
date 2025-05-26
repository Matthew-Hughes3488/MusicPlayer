from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class AlbumInput(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    artist: str = Field(..., min_length=1, max_length=100)
    genre: str = Field(..., min_length=1, max_length=50)
    description: Optional[str] = Field(None, max_length=500)
    cover_image_url: Optional[str] = Field(None, max_length=255)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None

    class ConfigDict:
        orm_mode = True
        anystr_strip_whitespace = True
        validate_assignment = True