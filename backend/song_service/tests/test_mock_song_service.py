import pytest
from services.mock_song_service import MockSongService
from models.song import Song
from models.song_input import SongInput
from datetime import datetime
from errors_exceptions.exceptions import SongNotFoundError

'''
Song models for reference:
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

'''

@pytest.fixture
def mock_service():
    from repos.mock_song_repo import MockSongRepository
    return MockSongService(MockSongRepository())

def test_get_all_songs(mock_service):
    songs = mock_service.get_all_songs()
    assert isinstance(songs, list)
    assert all(isinstance(s, Song) for s in songs)

def test_get_song_by_id(mock_service):
    song = mock_service.get_song_by_id(1)
    assert song is not None
    assert song.id == 1

def test_get_non_existent_song(mock_service):
    with pytest.raises(SongNotFoundError):
        mock_service.get_song_by_id(999)

def test_create_new_song(mock_service):
    song_input = SongInput(
        title="New Song",
        artist="New Artist",
        genre="New Genre",
        file_url="http://example.com/new_song.mp3",
        duration=240,
        description="A new song for testing.",
        cover_image_url="http://example.com/new_song.jpg",
        release_date=datetime.utcnow()
    )
    new_song = mock_service.create_new_song(song_input)
    assert new_song is not None
    assert new_song.title == "New Song"
    assert new_song.artist == "New Artist"

def test_update_song(mock_service):
    song_input = SongInput(
        title="Updated Song",
        artist="Updated Artist",
        genre="Updated Genre",
        file_url="http://example.com/updated_song.mp3",
        duration=300,
        description="An updated song description.",
        cover_image_url="http://example.com/updated_song.jpg",
        release_date=datetime.utcnow()
    )
    updated_song = mock_service.update_song(1, song_input)
    assert updated_song is not None
    assert updated_song.id == 1
    assert updated_song.title == "Updated Song"

def test_delete_song(mock_service):
    mock_service.delete_song(1)
    with pytest.raises(SongNotFoundError):
        mock_service.get_song_by_id(1)

def test_delete_non_existent_song(mock_service):
    with pytest.raises(SongNotFoundError):
        mock_service.delete_song(999)

def test_create_song_with_missing_fields(mock_service):
    song_input = SongInput(
        title="Incomplete Song",
        artist="Incomplete Artist",
        genre="Incomplete Genre",
        file_url="http://example.com/incomplete_song.mp3",
        duration=None,  # Duration is optional
        description=None,  # Description is optional
        cover_image_url=None,  # Cover image URL is optional
        release_date=None  # Release date is optional
    )
    new_song = mock_service.create_new_song(song_input)
    assert new_song is not None
    assert new_song.title == "Incomplete Song"
    assert new_song.artist == "Incomplete Artist"
    assert new_song.duration is None
    assert new_song.description is None
    assert new_song.cover_image_url is None
    assert new_song.release_date is None 