from models.song_input import SongInput
from typing import Optional
from datetime import datetime

class Song(SongInput):
    id: int

    class ConfigDict:
        orm_mode = True
        anystr_strip_whitespace = True
        validate_assignment = True

    def __init__(self, **data):
        super().__init__(**data)
        self.created_at = self.created_at or datetime.utcnow()
        self.updated_at = self.updated_at or None