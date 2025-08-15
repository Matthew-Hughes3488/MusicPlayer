"""
Simple Album API Test with In-Memory Database
"""

import pytest
import time
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Import FastAPI app and dependencies
from backend.album_service.app import app
from backend.album_service.routers.album_router import get_album_service

# Import your existing classes
from backend.album_service.services.album_alchemy_service import AlbumAlchemyService
from backend.album_service.repos.album_alchemy_repo import AlbumAlchemyRepository

# Import database models
from backend.database.models.base import Base
from backend.database.models.album_model import Album as AlbumModel
from backend.database.models.song_model import Song as SongModel
from backend.database.models.album_songs_model import album_songs
from backend.database.connector.test_connector import TestConnector

# Import mock data
from backend.album_service.tests.mock_test_data import MOCK_ALBUMS, MOCK_SONGS

# Import JWT utilities for creating test tokens
from backend.auth_service.model.jwt_payload import JWTPayload
from backend.auth_service.jwt_utils import create_access_token


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
    session.add_all(MOCK_ALBUMS)
    session.add_all(MOCK_SONGS)
    session.commit()
    
    # Create test components
    test_connector = TestConnector(session_factory=TestSessionLocal)

    test_repository = AlbumAlchemyRepository(db_connector=test_connector)
    test_service = AlbumAlchemyService(album_repository=test_repository)
    
    # Override FastAPI dependency
    app.dependency_overrides[get_album_service] = lambda: test_service
    
    # Create test client
    client = TestClient(app)
    
    yield client
    
    # Cleanup
    app.dependency_overrides.clear()


def test_get_all_albums(test_client):
    """
    Test GET /albums endpoint returns mock data.
    """
    response = test_client.get("/albums")
    
    assert response.status_code == 200
    albums = response.json()
    
    assert len(albums) == 8
    assert albums[0]["title"] == "The Dark Side of the Moon"
    assert albums[0]["artist"] == "Pink Floyd"

def test_get_album_by_id(test_client):
    """
    Test GET /albums/{album_id} endpoint returns specific album.
    """
    response = test_client.get("/albums/1", headers=get_auth_headers())
    assert response.status_code == 200
    album = response.json()
    
    assert album["id"] == 1
    assert album["title"] == "The Dark Side of the Moon"
    assert album["artist"] == "Pink Floyd"

def test_not_authorized_access(test_client):
    """
    Test unauthorized access to album endpoint.
    """
    try:
        response = test_client.get("/albums/1")
    except Exception as e:
        assert str(e) == "Unauthorized"
    else:
        assert response.status_code == 401