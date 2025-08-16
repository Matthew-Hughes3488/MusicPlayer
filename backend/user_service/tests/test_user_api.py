"""
Simple User API Test with In-Memory Database
"""

import pytest
import time
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Import FastAPI app and dependencies
from backend.user_service.app import app
from backend.user_service.routers.user_router import get_user_service

# Import your existing classes
from backend.user_service.services.user_alchemy_service import UserAlchemyService
from backend.user_service.repos.user_alchemy_repo import UserAlchemyRepo

# Import database models
from backend.database.models.base import Base
from backend.database.models.album_model import Album as AlbumModel
from backend.database.models.song_model import Song as SongModel
from backend.database.models.album_songs_model import album_songs
from backend.database.models.user_likes import user_likes
from backend.database.connector.test_connector import TestConnector

# Import mock data
from backend.user_service.tests.mock_test_data import *

# Import JWT utilities for creating test tokens
from backend.auth_service.model.jwt_payload import JWTPayload
from backend.auth_service.jwt_utils import create_access_token

from backend.user_service.errors_exceptions.exceptions import UserNotFoundError

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
    session.add_all(MOCK_USERS)
    session.commit()
    
    # Create test components
    test_connector = TestConnector(session_factory=TestSessionLocal)

    test_repository = UserAlchemyRepo(db_connector=test_connector)
    test_service = UserAlchemyService(repo=test_repository)
    
    # Override FastAPI dependency
    app.dependency_overrides[get_user_service] = lambda: test_service
    
    # Create test client
    client = TestClient(app)
    
    yield client
    
    # Cleanup
    app.dependency_overrides.clear()


def test_get_all_users(test_client):
    '''
    Test retrieving all users.
    '''
    response = test_client.get("/users", headers=get_auth_headers())
    assert response.status_code == 200
    assert len(response.json()) == len(MOCK_USERS)

def test_get_user_by_id(test_client):
    '''
    Test retrieving a user by ID.
    '''
    response = test_client.get("/users/1", headers=get_auth_headers())
    assert response.status_code == 200
    assert response.json()["id"] == 1

def test_create_user(test_client):
    '''
    Test creating a new user.
    '''
    user_data = get_user_for_create_test()
    response = test_client.post("/users", json=user_data, headers=get_auth_headers(role="admin"))
    created_user = response.json()
    assert response.status_code == 200
    assert created_user["id"] is not None
    assert created_user["username"] == user_data["username"]

def test_update_user(test_client):
    '''
    Test updating an existing user.
    '''
    user_data = get_user_for_update_test()
    response = test_client.put("/users/1", json=user_data, headers=get_auth_headers(role="admin"))
    updated_user = response.json()
    assert response.status_code == 200
    assert updated_user["id"] == 1
    assert updated_user["username"] == user_data["username"]

def test_delete_user(test_client):
    '''
    Test deleting a user.
    '''
    response = test_client.delete("/users/1", headers=get_auth_headers(role="admin"))
    assert response.status_code == 200
    assert response.json() == {"detail": "User deleted"}

def test_not_authorized_access(test_client):
    """
    Test unauthorized access to user endpoint.
    """
    try:
        response = test_client.get("/users/1")
    except Exception as e:
        assert str(e) == "Unauthorized"
    else:
        assert response.status_code == 401