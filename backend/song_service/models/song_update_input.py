from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class SongUpdateInput(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    artist: Optional[str] = Field(None, min_length=1, max_length=100)
    genre: Optional[str] = Field(None, min_length=1, max_length=50)
    file_url: str = Field(None, min_length=1, max_length=255)
    duration: Optional[int] = Field(None, ge=0)  # Duration in seconds
    description: Optional[str] = Field(None, max_length=500)
    cover_image_url: Optional[str] = Field(None, max_length=255)
    release_date: Optional[datetime] = None
    created_at: Optional[datetime] = Field(None)
    updated_at: Optional[datetime] = Field(default_factory=datetime.now)

    class ConfigDict:
        orm_mode = True
        anystr_strip_whitespace = True
        validate_assignment = True