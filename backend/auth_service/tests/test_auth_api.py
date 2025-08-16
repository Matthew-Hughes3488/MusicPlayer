"""
Auth Service API Tests

Tests only the /auth/login endpoint functionality.
"""

import pytest
from unittest.mock import patch
from fastapi.testclient import TestClient

from backend.auth_service.app import app
from backend.auth_service.routers import auth_service


# Mock user data - just what we need for login testing
MOCK_USER_RESPONSES = {
    "john.doe@example.com": {
        "user_id": 1,
        "password_hash": "$2b$12$test.hash.for.password123"
    },
    "admin@example.com": {
        "user_id": 2, 
        "password_hash": "$2b$12$test.hash.for.admin123"
    }
}


def mock_get_user_by_email(email: str):
    """Mock the user service call."""
    return MOCK_USER_RESPONSES.get(email.lower())


def mock_verify_password(plain_password: str, hashed_password: str) -> bool:
    """Mock password verification for testing."""
    # Simple mock - in real tests you'd use actual hashing
    password_map = {
        "$2b$12$test.hash.for.password123": "password123",
        "$2b$12$test.hash.for.admin123": "admin123"
    }
    return password_map.get(hashed_password) == plain_password


@pytest.fixture
def test_client():
    """Create test client with mocked dependencies."""
    with patch.object(auth_service, 'get_user_by_email', side_effect=mock_get_user_by_email), \
         patch('backend.auth_service.auth_service.password_manager.verify_password', side_effect=mock_verify_password):
        yield TestClient(app)


def test_successful_login(test_client):
    """Test successful login returns token and user_id."""
    response = test_client.post("/auth/login", json={
        "email": "john.doe@example.com",
        "password": "password123"
    })
    
    assert response.status_code == 200
    data = response.json()
    assert "auth_token" in data
    assert data["user_id"] == 1
    assert len(data["auth_token"]) > 0


def test_login_invalid_email(test_client):
    """Test login with non-existent email."""
    response = test_client.post("/auth/login", json={
        "email": "nonexistent@example.com",
        "password": "password123"
    })
    
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"


def test_login_invalid_password(test_client):
    """Test login with wrong password."""
    response = test_client.post("/auth/login", json={
        "email": "john.doe@example.com", 
        "password": "wrongpassword"
    })
    
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"


def test_login_missing_fields(test_client):
    """Test login with missing required fields."""
    response = test_client.post("/auth/login", json={
        "email": "john.doe@example.com"
        # Missing password
    })
    
    assert response.status_code == 422  # Validation error


def test_admin_user_login(test_client):
    """Test admin user can login successfully."""
    response = test_client.post("/auth/login", json={
        "email": "admin@example.com",
        "password": "admin123"
    })
    
    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == 2
    assert "auth_token" in data


if __name__ == "__main__":
    print("🔐 Auth Service Login Tests")
    print("Run with: pytest backend/auth_service/tests/test_auth_api.py -v")
