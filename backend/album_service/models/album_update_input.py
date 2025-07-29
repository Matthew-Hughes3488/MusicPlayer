from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class AlbumUpdateInput(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    artist: Optional[str] = Field(None, min_length=1, max_length=100)
    genre: Optional[str] = Field(None, min_length=1, max_length=50)
    description: Optional[str] = Field(None, max_length=500)
    cover_image_url: Optional[str] = Field(None, max_length=255)
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None

    class ConfigDict:
        orm_mode = True
        anystr_strip_whitespace = True
        validate_assignment = True