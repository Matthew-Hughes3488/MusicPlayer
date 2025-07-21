import pytest
from repos.mock_song_repo import MockSongRepository
from models.song import Song
from datetime import datetime

@pytest.fixture
def repo():
    return MockSongRepository()

def test_list_songs(repo):
    songs = repo.list_songs()
    assert isinstance(songs, list)
    assert all(isinstance(s, Song) for s in songs)

def test_create_song(repo):
    new_song = Song(
        id=5,
        title="Test Song",
        artist="Test Artist",
        genre="Test Genre",
        file_url="http://example.com/test_song.mp3",
        duration=300,
        description="A test song for unit testing.",
        cover_image_url="http://example.com/test_song.jpg",
        release_date=datetime.utcnow(),
        created_at=datetime.utcnow(),
        updated_at=None
    )
    created_song = repo.create_song(new_song)
    assert created_song is not None
    assert created_song.id == 5 
    assert created_song.title == "Test Song"

def test_get_song_by_id(repo):
    song = repo.get_song_by_id(1)
    assert song is not None
    assert song.id == 1
    assert song.title == "Song One"

def test_get_non_existent_song(repo):
    non_existent_song = repo.get_song_by_id(999)
    assert non_existent_song is None

def test_update_song(repo):
    song = repo.get_song_by_id(1)
    assert song is not None
    song.title = "Updated Song One"
    updated_song = repo.update_song(song)
    assert updated_song is not None
    assert updated_song.title == "Updated Song One"

def test_delete_song(repo):
    song = repo.get_song_by_id(1)
    assert song is not None
    repo.delete_song(1)
    deleted_song = repo.get_song_by_id(1)
    assert deleted_song is None

def test_delete_non_existent_song(repo):
    result = repo.delete_song(999)
    assert result is False