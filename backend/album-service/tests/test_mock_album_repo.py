import pytest
from repos.mock_album_repo import MockAlbumRepository
from models.album import Album
from datetime import datetime

@pytest.fixture
def repo():
    return MockAlbumRepository()

def test_list_albums(repo):
    albums = repo.list_albums()
    assert isinstance(albums, list)
    assert all(isinstance(a, Album) for a in albums)

def test_create_album(repo):
    new_album = Album(
        id=5,
        title="Test Album",
        artist="Test Artist",
        genre="Test Genre",
        release_date=datetime.utcnow(),
        created_at=datetime.utcnow(),
        updated_at=None
    )
    created_album = repo.create_album(new_album)
    assert created_album is not None
    assert created_album.id == 5 
    assert created_album.title == "Test Album"

def test_get_album_by_id(repo):
    album = repo.get_album_by_id(1)
    assert album is not None
    assert album.id == 1
    assert album.title == "Greatest Hits"

def test_get_non_existent_album(repo):
    non_existent_album = repo.get_album_by_id(999)
    assert non_existent_album is None

def test_update_album(repo):
    album = repo.get_album_by_id(1)
    assert album is not None
    album.title = "Updated Greatest Hits"
    updated_album = repo.update_album(album)
    assert updated_album is not None
    assert updated_album.title == "Updated Greatest Hits"





