from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class SongInput(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    artist: str = Field(..., min_length=1, max_length=100)
    genre: str = Field(..., min_length=1, max_length=50)
    file_url: str = Field(..., min_length=1, max_length=255)
    duration: Optional[int] = Field(None, ge=0)  # Duration in seconds
    description: Optional[str] = Field(None, max_length=500)
    cover_image_url: Optional[str] = Field(None, max_length=255)
    release_date: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None

    class ConfigDict:
        orm_mode = True
        anystr_strip_whitespace = True
        validate_assignment = True