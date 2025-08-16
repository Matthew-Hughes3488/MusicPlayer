"""
Mock Test Data for User Service API Tests

This file contains realistic mock data for testing the User Service API.
All data matches the actual database models and can be used for direct insertion into test databases.

Usage:
    from backend.user_service.tests.mock_test_data import MOCK_USERS, get_user_by_id
    
    # In your test setup
    db_session.add_all(MOCK_USERS)
    db_session.commit()
"""

from datetime import datetime
from backend.database.models.user_model import User

# =============================================================================
# MOCK USERS - Realistic user data matching the actual User database model
# =============================================================================

MOCK_USERS = [
    User(
        id=1,
        username="john_doe",
        email="john.doe@example.com",
        password_hash="$2b$12$hashed_password_john_example",
        first_name="John",
        last_name="Doe",
        created_at=datetime(2023, 1, 15, 10, 0, 0),
        updated_at=datetime(2023, 8, 20, 14, 30, 0)
    ),
    
    User(
        id=2,
        username="jane_smith",
        email="jane.smith@example.com",
        password_hash="$2b$12$hashed_password_jane_example",
        first_name="Jane",
        last_name="Smith",
        created_at=datetime(2023, 2, 10, 14, 30, 0),
        updated_at=datetime(2023, 9, 5, 16, 15, 0)
    ),
    
    User(
        id=3,
        username="music_maven",
        email="music.maven@example.com",
        password_hash="$2b$12$hashed_password_maven_example",
        first_name="Alex",
        last_name="Johnson",
        created_at=datetime(2023, 3, 5, 9, 15, 0),
        updated_at=datetime(2023, 10, 12, 11, 20, 0)
    ),
    
    User(
        id=4,
        username="sarah_wilson",
        email="sarah.wilson@example.com",
        password_hash="$2b$12$hashed_password_sarah_example",
        first_name="Sarah",
        last_name="Wilson",
        created_at=datetime(2023, 4, 20, 16, 45, 0),
        updated_at=datetime(2023, 11, 8, 10, 30, 0)
    ),
    
    User(
        id=5,
        username="jazz_enthusiast",
        email="jazz.lover@example.com",
        password_hash="$2b$12$hashed_password_jazz_example",
        first_name="Miles",
        last_name="Davis",
        created_at=datetime(2023, 5, 12, 11, 20, 0),
        updated_at=datetime(2023, 12, 15, 13, 45, 0)
    ),
    
    User(
        id=6,
        username="admin_user",
        email="admin@example.com",
        password_hash="$2b$12$hashed_password_admin_example",
        first_name="Admin",
        last_name="User",
        created_at=datetime(2023, 1, 1, 8, 0, 0),
        updated_at=datetime(2023, 12, 1, 9, 0, 0)
    ),
    
    User(
        id=7,
        username="new_member",
        email="newbie@example.com",
        password_hash="$2b$12$hashed_password_new_example",
        first_name="Emma",
        last_name="Brown",
        created_at=datetime(2023, 12, 1, 12, 0, 0),
        updated_at=datetime(2023, 12, 1, 12, 0, 0)
    ),
    
    User(
        id=8,
        username="rock_fan_2023",
        email="rock.fan@example.com",
        password_hash="$2b$12$hashed_password_rock_example",
        first_name="David",
        last_name="Rodriguez",
        created_at=datetime(2023, 11, 15, 18, 30, 0),
        updated_at=datetime(2023, 12, 10, 20, 15, 0)
    ),
    
    # User with optional last_name as None (testing edge cases)
    User(
        id=9,
        username="minimal_user",
        email="minimal@example.com",
        password_hash="$2b$12$hashed_password_minimal_example",
        first_name="Min",
        last_name=None,  # Optional field
        created_at=datetime(2023, 10, 20, 9, 45, 0),
        updated_at=None  # Optional field
    ),
    
    # User with no updates (updated_at = None)
    User(
        id=10,
        username="never_updated",
        email="never.updated@example.com",
        password_hash="$2b$12$hashed_password_never_example",
        first_name="Never",
        last_name="Updated",
        created_at=datetime(2023, 6, 8, 13, 10, 0),
        updated_at=None
    ),
]

# =============================================================================
# HELPER FUNCTIONS FOR TESTS
# =============================================================================

def get_user_by_id(user_id: int) -> User:
    """Get a mock user by ID for testing."""
    return next((user for user in MOCK_USERS if user.id == user_id), None)

def get_user_by_email(email: str) -> User:
    """Get a mock user by email for testing."""
    return next((user for user in MOCK_USERS if user.email.lower() == email.lower()), None)

def get_user_by_username(username: str) -> User:
    """Get a mock user by username for testing."""
    return next((user for user in MOCK_USERS if user.username.lower() == username.lower()), None)

def get_users_with_last_name() -> list[User]:
    """Get all users who have a last name."""
    return [user for user in MOCK_USERS if user.last_name is not None]

def get_users_without_last_name() -> list[User]:
    """Get all users who don't have a last name."""
    return [user for user in MOCK_USERS if user.last_name is None]

def get_users_with_updates() -> list[User]:
    """Get users who have been updated (updated_at is not None)."""
    return [user for user in MOCK_USERS if user.updated_at is not None]

def get_users_never_updated() -> list[User]:
    """Get users who have never been updated (updated_at is None)."""
    return [user for user in MOCK_USERS if user.updated_at is None]

def get_recently_created_users(days: int = 30) -> list[User]:
    """Get users who were created within the last specified days."""
    from datetime import datetime, timedelta
    cutoff_date = datetime.now() - timedelta(days=days)
    return [user for user in MOCK_USERS if user.created_at >= cutoff_date]

def get_user_for_create_test() -> dict:
    """Get user data for POST/create tests (as dict for JSON serialization)."""
    return {
        "username": "test_new_user",
        "email": "test.new@example.com",
        "password": "testpassword123",  # Will be hashed by the service
        "first_name": "Test",
        "last_name": "User"
    }

def get_user_for_update_test() -> dict:
    """Get user data for PUT/update tests (as dict for JSON serialization)."""
    return {
        "username": "updated_test_user",
        "email": "updated.test@example.com",
        "first_name": "Updated",
        "last_name": "TestUser"
    }

def get_invalid_user_data() -> list[dict]:
    """Get invalid user data for validation testing."""
    return [
        {
            # Missing required username
            "email": "test@example.com",
            "password": "password123",
            "first_name": "Test"
        },
        {
            # Missing required email
            "username": "testuser",
            "password": "password123",
            "first_name": "Test"
        },
        {
            # Missing required password
            "username": "testuser",
            "email": "test@example.com",
            "first_name": "Test"
        },
        {
            # Missing required first_name
            "username": "testuser",
            "email": "test@example.com",
            "password": "password123"
        },
        {
            "username": "",  # Empty username
            "email": "test@example.com",
            "password": "password123",
            "first_name": "Test"
        },
        {
            "username": "testuser",
            "email": "invalid-email",  # Invalid email format
            "password": "password123",
            "first_name": "Test"
        },
        {
            "username": "john_doe",  # Existing username
            "email": "newemail@example.com",
            "password": "password123",
            "first_name": "Test"
        },
        {
            "username": "newuser",
            "email": "john.doe@example.com",  # Existing email
            "password": "password123",
            "first_name": "Test"
        }
    ]

def get_user_search_queries() -> list[dict]:
    """Get sample search queries for user search testing."""
    return [
        {"query": "john", "expected_count": 1},
        {"query": "user", "expected_count": 2},  # admin_user, minimal_user
        {"query": "music", "expected_count": 1}, # music_maven
        {"query": "@example.com", "expected_count": len(MOCK_USERS)},  # All have example.com emails
        {"query": "nonexistent", "expected_count": 0},
        {"query": "", "expected_count": len(MOCK_USERS)},  # Empty query returns all
    ]

# =============================================================================
# SUMMARY STATISTICS FOR TEST VALIDATION
# =============================================================================

MOCK_DATA_STATS = {
    "total_users": len(MOCK_USERS),
    "users_with_last_name": len(get_users_with_last_name()),
    "users_without_last_name": len(get_users_without_last_name()),
    "users_with_updates": len(get_users_with_updates()),
    "users_never_updated": len(get_users_never_updated()),
    "unique_usernames": len(set(user.username for user in MOCK_USERS)),
    "unique_emails": len(set(user.email for user in MOCK_USERS)),
}

def print_mock_data_summary():
    """Print a summary of the mock data for debugging tests."""
    print("👥 User Service Mock Data Summary:")
    print(f"   Total Users: {MOCK_DATA_STATS['total_users']}")
    print(f"   With Last Name: {MOCK_DATA_STATS['users_with_last_name']}")
    print(f"   Without Last Name: {MOCK_DATA_STATS['users_without_last_name']}")
    print(f"   With Updates: {MOCK_DATA_STATS['users_with_updates']}")
    print(f"   Never Updated: {MOCK_DATA_STATS['users_never_updated']}")
    print(f"   Unique Usernames: {MOCK_DATA_STATS['unique_usernames']}")
    print(f"   Unique Emails: {MOCK_DATA_STATS['unique_emails']}")

if __name__ == "__main__":
    # If run directly, print summary of mock data
    print_mock_data_summary()
