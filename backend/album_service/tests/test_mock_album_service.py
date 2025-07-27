import pytest
from backend.album_service.services.mock_album_service import MockAlbumService
from backend.album_service.models.album import Album
from backend.album_service.models.album_input import AlbumInput
from datetime import datetime
from backend.album_service.errors_exceptions.exceptions import AlbumNotFoundError

@pytest.fixture
def mock_service():
    from repos.mock_album_repo import MockAlbumRepository
    return MockAlbumService(MockAlbumRepository())

def test_get_all_albums(mock_service):
    albums = mock_service.get_all_albums()
    assert isinstance(albums, list)
    assert all(isinstance(a, Album) for a in albums)

def test_get_album_by_id(mock_service):
    album = mock_service.get_album_by_id(1)
    assert album is not None
    assert album.id == 1

def test_get_non_existent_album(mock_service):
    with pytest.raises(AlbumNotFoundError):
        mock_service.get_album_by_id(999)

def test_create_new_album(mock_service):
    new_album_input = AlbumInput(
        title="New Album",
        artist="New Artist",
        genre="New Genre",
        description="A brand new album",
        cover_image_url="http://example.com/cover.jpg",
        created_at=datetime.now(),
        updated_at=None
    )
    new_album = mock_service.create_new_album(new_album_input)
    assert new_album is not None
    assert new_album.title == "New Album"
    assert new_album.artist == "New Artist"
    assert new_album.genre == "New Genre"

def test_update_album(mock_service):
    album_input = AlbumInput(
        title="Updated Album",
        artist="Updated Artist",
        genre="Updated Genre",
        description="An updated album description",
        cover_image_url="http://example.com/updated_cover.jpg",
        created_at=datetime.now(),
        updated_at=None
    )
    updated_album = mock_service.update_album(1, album_input)
    assert updated_album is not None
    assert updated_album.id == 1
    assert updated_album.title == "Updated Album"

def test_delete_album(mock_service):
    mock_service.delete_album(1)
    with pytest.raises(AlbumNotFoundError):
        mock_service.get_album_by_id(1)

def test_delete_non_existent_album(mock_service):
    with pytest.raises(AlbumNotFoundError):
        mock_service.delete_album(999)

