"""
Simple Song API Test with In-Memory Database
"""

import pytest
import time
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Import FastAPI app and dependencies
from backend.song_service.app import app
from backend.song_service.routers.song_router import get_song_service

# Import your existing classes
from backend.song_service.services.song_alchemy_service import SongAlchemyService
from backend.song_service.repos.song_alchemy_repo import SongAlchemyRepository

# Import database models
from backend.database.models.base import Base
from backend.database.models.album_model import Album as AlbumModel
from backend.database.models.song_model import Song as SongModel
from backend.database.models.album_songs_model import album_songs
from backend.database.models.user_likes import user_likes
from backend.database.connector.test_connector import TestConnector

# Import mock data
from backend.song_service.tests.mock_test_data import *

# Import JWT utilities for creating test tokens
from backend.auth_service.model.jwt_payload import JWTPayload
from backend.auth_service.jwt_utils import create_access_token

from backend.song_service.errors_exceptions.exceptions import SongNotFoundError

def create_test_token(user_id: str = "1", role: str = "user") -> str:
    """Create a simple test JWT token."""
    payload = JWTPayload(
        sub=user_id,
        exp=int(time.time()) + 3600,  # 1 hour from now
        iat=int(time.time()),
        role=role
    )
    return create_access_token(payload)

def get_auth_headers(role: str = "user") -> dict:
    """Generate authorization headers with a test token."""
    token = create_test_token(user_id="1", role=role)
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture(scope="function")
def test_client():
    """
    Create test client with in-memory database and mock data.
    """
    # Create in-memory database using a file-like path to ensure persistence
    # within the test scope
    engine = create_engine(
        "sqlite:///file:memdb1?mode=memory&cache=shared&uri=true", 
        connect_args={"check_same_thread": False},
        echo=False
    )
    Base.metadata.create_all(bind=engine)
    
    # Create session factory
    TestSessionLocal = sessionmaker(bind=engine)
    
    # Populate with mock data
    session = TestSessionLocal()
    session.add_all(MOCK_SONGS)
    session.commit()
    
    # Create test components
    test_connector = TestConnector(session_factory=TestSessionLocal)

    test_repository = SongAlchemyRepository(db_connector=test_connector)
    test_service = SongAlchemyService(song_repository=test_repository)
    
    # Override FastAPI dependency
    app.dependency_overrides[get_song_service] = lambda: test_service
    
    # Create test client
    client = TestClient(app)
    
    yield client
    
    # Cleanup
    app.dependency_overrides.clear()


def test_get_all_songs(test_client):
    """
    Test GET /songs endpoint returns all songs.
    """
    response = test_client.get("/songs", headers=get_auth_headers())
    assert response.status_code == 200
    songs = response.json()
    assert isinstance(songs, list)
    assert len(songs) > 0

def test_get_song_by_id(test_client):
    """
    Test GET /songs/{song_id} endpoint returns a specific song.
    """
    response = test_client.get("/songs/1", headers=get_auth_headers())
    assert response.status_code == 200
    song = response.json()
    assert song["id"] == 1

def test_create_song(test_client):
    """
    Test POST /songs endpoint creates a new song.
    """
    new_song = get_song_for_create_test()
    response = test_client.post("/songs", json=new_song, headers=get_auth_headers(role="admin"))
    assert response.status_code == 200
    created_song = response.json()
    assert created_song["id"] is not None
    assert created_song["title"] == new_song["title"]

def test_update_song(test_client):
    """
    Test PUT /songs/{song_id} endpoint updates an existing song.
    """
    updated_song = get_song_for_update_test()
    response = test_client.put("/songs/1", json=updated_song, headers=get_auth_headers(role="admin"))
    assert response.status_code == 200
    assert response.json()["title"] == updated_song["title"]

def test_delete_song(test_client):
    """
    Test DELETE /songs/{song_id} endpoint deletes an song.
    """
    response = test_client.delete("/songs/1", headers=get_auth_headers(role="admin"))
    assert response.status_code == 200
    assert response.json() == {"detail": "Song deleted successfully"}

    response = test_client.get("/songs/1", headers=get_auth_headers())
    assert response.status_code == 404

def test_not_authorized_access(test_client):
    """
    Test unauthorized access to song endpoint.
    """
    try:
        response = test_client.get("/songs/1")
    except Exception as e:
        assert str(e) == "Unauthorized"
    else:
        assert response.status_code == 401