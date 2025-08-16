"""
Mock Test Data for Auth Service API Tests

This file contains realistic mock data for testing the Auth Service API.
All data is in SQLAlchemy model format for direct insertion into test databases.

Usage:
    from backend.auth_service.tests.mock_test_data import MOCK_USERS, MOCK_AUTH_INFO
    
    # In your test setup
    db_session.add_all(MOCK_USERS)
    db_session.commit()
"""

from datetime import datetime
from backend.database.models.user_model import User as UserModel
from backend.auth_service.model.auth_info_model import AuthInfoModel
from backend.auth_service.security_utils import password_manager

# =============================================================================
# MOCK USERS - Realistic user data for authentication testing
# =============================================================================

MOCK_USERS = [
    # Regular Users
    UserModel(
        user_id=1,
        username="john_doe",
        email="john.doe@example.com",
        password_hash=password_manager.hash_password("password123"),
        first_name="John",
        last_name="Doe",
        role="user",
        is_active=True,
        created_at=datetime(2023, 1, 15, 10, 0, 0),
        updated_at=datetime(2023, 1, 15, 10, 0, 0)
    ),
    
    UserModel(
        user_id=2,
        username="jane_smith",
        email="jane.smith@example.com",
        password_hash=password_manager.hash_password("securepass456"),
        first_name="Jane",
        last_name="Smith",
        role="user",
        is_active=True,
        created_at=datetime(2023, 2, 10, 14, 30, 0),
        updated_at=datetime(2023, 2, 10, 14, 30, 0)
    ),
    
    UserModel(
        user_id=3,
        username="music_lover",
        email="music.lover@example.com",
        password_hash=password_manager.hash_password("melody789"),
        first_name="Alex",
        last_name="Johnson",
        role="user",
        is_active=True,
        created_at=datetime(2023, 3, 5, 9, 15, 0),
        updated_at=datetime(2023, 3, 5, 9, 15, 0)
    ),
    
    # Admin Users
    UserModel(
        user_id=4,
        username="admin_user",
        email="admin@example.com",
        password_hash=password_manager.hash_password("admin123"),
        first_name="Admin",
        last_name="User",
        role="admin",
        is_active=True,
        created_at=datetime(2023, 1, 1, 8, 0, 0),
        updated_at=datetime(2023, 1, 1, 8, 0, 0)
    ),
    
    UserModel(
        user_id=5,
        username="super_admin",
        email="superadmin@example.com",
        password_hash=password_manager.hash_password("superadmin456"),
        first_name="Super",
        last_name="Admin",
        role="admin",
        is_active=True,
        created_at=datetime(2023, 1, 1, 8, 0, 0),
        updated_at=datetime(2023, 1, 1, 8, 0, 0)
    ),
    
    # Premium Users
    UserModel(
        user_id=6,
        username="premium_user",
        email="premium@example.com",
        password_hash=password_manager.hash_password("premium789"),
        first_name="Premium",
        last_name="User",
        role="premium",
        is_active=True,
        created_at=datetime(2023, 4, 20, 16, 45, 0),
        updated_at=datetime(2023, 4, 20, 16, 45, 0)
    ),
    
    # Inactive User (for testing account status)
    UserModel(
        user_id=7,
        username="inactive_user",
        email="inactive@example.com",
        password_hash=password_manager.hash_password("inactive123"),
        first_name="Inactive",
        last_name="User",
        role="user",
        is_active=False,
        created_at=datetime(2023, 5, 12, 11, 20, 0),
        updated_at=datetime(2023, 5, 12, 11, 20, 0)
    ),
    
    # Test User for edge cases
    UserModel(
        user_id=8,
        username="test_user",
        email="test.user@example.com",
        password_hash=password_manager.hash_password("testpass"),
        first_name="Test",
        last_name="User",
        role="user",
        is_active=True,
        created_at=datetime(2023, 6, 8, 13, 10, 0),
        updated_at=datetime(2023, 6, 8, 13, 10, 0)
    ),
]

# =============================================================================
# MOCK AUTH INFO - For direct AuthInfoModel testing
# =============================================================================

MOCK_AUTH_INFO = [
    AuthInfoModel(
        user_id=1,
        username="john_doe",
        email="john.doe@example.com",
        password_hash=password_manager.hash_password("password123"),
        role="user",
        is_active=True
    ),
    
    AuthInfoModel(
        user_id=4,
        username="admin_user",
        email="admin@example.com",
        password_hash=password_manager.hash_password("admin123"),
        role="admin",
        is_active=True
    ),
    
    AuthInfoModel(
        user_id=7,
        username="inactive_user",
        email="inactive@example.com",
        password_hash=password_manager.hash_password("inactive123"),
        role="user",
        is_active=False
    ),
]

# =============================================================================
# HELPER FUNCTIONS FOR TESTS
# =============================================================================

def get_user_by_id(user_id: int) -> UserModel:
    """Get a mock user by ID for testing."""
    return next((user for user in MOCK_USERS if user.user_id == user_id), None)

def get_user_by_email(email: str) -> UserModel:
    """Get a mock user by email for testing."""
    return next((user for user in MOCK_USERS if user.email.lower() == email.lower()), None)

def get_user_by_username(username: str) -> UserModel:
    """Get a mock user by username for testing."""
    return next((user for user in MOCK_USERS if user.username.lower() == username.lower()), None)

def get_users_by_role(role: str) -> list[UserModel]:
    """Get all mock users with a specific role."""
    return [user for user in MOCK_USERS if user.role.lower() == role.lower()]

def get_active_users() -> list[UserModel]:
    """Get all active mock users."""
    return [user for user in MOCK_USERS if user.is_active]

def get_inactive_users() -> list[UserModel]:
    """Get all inactive mock users."""
    return [user for user in MOCK_USERS if not user.is_active]

def get_valid_login_credentials() -> list[dict]:
    """Get valid email/password combinations for login testing."""
    return [
        {"email": "john.doe@example.com", "password": "password123"},
        {"email": "admin@example.com", "password": "admin123"},
        {"email": "jane.smith@example.com", "password": "securepass456"},
        {"email": "premium@example.com", "password": "premium789"},
    ]

def get_invalid_login_credentials() -> list[dict]:
    """Get invalid email/password combinations for testing."""
    return [
        {"email": "john.doe@example.com", "password": "wrongpassword"},
        {"email": "nonexistent@example.com", "password": "password123"},
        {"email": "inactive@example.com", "password": "inactive123"},  # Valid creds but inactive user
        {"email": "", "password": "password123"},
        {"email": "john.doe@example.com", "password": ""},
    ]

def get_user_for_registration_test() -> dict:
    """Get user data for POST/registration tests (as dict for JSON serialization)."""
    return {
        "username": "new_test_user",
        "email": "new.test@example.com",
        "password": "newuserpass123",
        "first_name": "New",
        "last_name": "User",
        "role": "user"
    }

def get_user_for_update_test() -> dict:
    """Get user data for PUT/update tests (as dict for JSON serialization)."""
    return {
        "username": "updated_user",
        "email": "updated@example.com",
        "first_name": "Updated",
        "last_name": "User",
        "role": "premium"
    }

def get_invalid_user_data() -> list[dict]:
    """Get invalid user data for validation testing."""
    return [
        {
            "username": "",  # Empty username
            "email": "test@example.com",
            "password": "password123"
        },
        {
            "username": "testuser",
            "email": "invalid-email",  # Invalid email format
            "password": "password123"
        },
        {
            "username": "testuser",
            "email": "test@example.com",
            "password": "123"  # Too short password
        },
        {
            "username": "john_doe",  # Existing username
            "email": "duplicate@example.com",
            "password": "password123"
        },
        {
            "username": "newuser",
            "email": "john.doe@example.com",  # Existing email
            "password": "password123"
        }
    ]

def get_password_change_data() -> dict:
    """Get data for password change testing."""
    return {
        "current_password": "password123",
        "new_password": "newpassword456",
        "confirm_password": "newpassword456"
    }

def get_invalid_password_change_data() -> list[dict]:
    """Get invalid password change data for testing."""
    return [
        {
            "current_password": "wrongpassword",  # Wrong current password
            "new_password": "newpassword456",
            "confirm_password": "newpassword456"
        },
        {
            "current_password": "password123",
            "new_password": "new123",  # Too short
            "confirm_password": "new123"
        },
        {
            "current_password": "password123",
            "new_password": "newpassword456",
            "confirm_password": "different456"  # Passwords don't match
        }
    ]

# =============================================================================
# SUMMARY STATISTICS FOR TEST VALIDATION
# =============================================================================

MOCK_DATA_STATS = {
    "total_users": len(MOCK_USERS),
    "active_users": len(get_active_users()),
    "inactive_users": len(get_inactive_users()),
    "roles": list(set(user.role for user in MOCK_USERS)),
    "admin_count": len(get_users_by_role("admin")),
    "user_count": len(get_users_by_role("user")),
    "premium_count": len(get_users_by_role("premium")),
}

def print_mock_data_summary():
    """Print a summary of the mock data for debugging tests."""
    print("👤 Auth Service Mock Data Summary:")
    print(f"   Total Users: {MOCK_DATA_STATS['total_users']}")
    print(f"   Active: {MOCK_DATA_STATS['active_users']}, Inactive: {MOCK_DATA_STATS['inactive_users']}")
    print(f"   Roles: {', '.join(MOCK_DATA_STATS['roles'])}")
    print(f"   Admins: {MOCK_DATA_STATS['admin_count']}, Users: {MOCK_DATA_STATS['user_count']}, Premium: {MOCK_DATA_STATS['premium_count']}")

if __name__ == "__main__":
    # If run directly, print summary of mock data
    print_mock_data_summary()
