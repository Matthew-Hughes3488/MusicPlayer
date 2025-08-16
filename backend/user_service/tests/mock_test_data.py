"""
Mock Test Data for User Service API Tests

This file contains realistic mock data for testing the User Service API.
All data is in SQLAlchemy model format for direct insertion into test databases.

Usage:
    from backend.user_service.tests.mock_test_data import MOCK_USERS, MOCK_USER_PREFERENCES
    
    # In your test setup
    db_session.add_all(MOCK_USERS)
    db_session.commit()
"""

from datetime import datetime
from backend.database.models.user_model import User as UserModel

# =============================================================================
# MOCK USERS - Realistic user data for user management testing
# =============================================================================

MOCK_USERS = [
    # Active Regular Users
    UserModel(
        user_id=1,
        username="john_doe",
        email="john.doe@example.com",
        password_hash="$2b$12$hashed_password_john",  # Represents hashed password
        first_name="John",
        last_name="Doe",
        role="user",
        is_active=True,
        date_of_birth=datetime(1990, 5, 15),
        phone_number="+1234567890",
        profile_picture_url="https://example.com/profiles/john_doe.jpg",
        bio="Music enthusiast and software developer",
        location="New York, NY",
        created_at=datetime(2023, 1, 15, 10, 0, 0),
        updated_at=datetime(2023, 8, 20, 14, 30, 0)
    ),
    
    UserModel(
        user_id=2,
        username="jane_smith",
        email="jane.smith@example.com",
        password_hash="$2b$12$hashed_password_jane",
        first_name="Jane",
        last_name="Smith",
        role="user",
        is_active=True,
        date_of_birth=datetime(1988, 9, 23),
        phone_number="+1987654321",
        profile_picture_url="https://example.com/profiles/jane_smith.jpg",
        bio="Indie music lover and artist",
        location="Los Angeles, CA",
        created_at=datetime(2023, 2, 10, 14, 30, 0),
        updated_at=datetime(2023, 9, 5, 16, 15, 0)
    ),
    
    UserModel(
        user_id=3,
        username="music_maven",
        email="music.maven@example.com",
        password_hash="$2b$12$hashed_password_maven",
        first_name="Alex",
        last_name="Johnson",
        role="user",
        is_active=True,
        date_of_birth=datetime(1995, 12, 8),
        phone_number="+1555123456",
        profile_picture_url="https://example.com/profiles/alex_johnson.jpg",
        bio="Electronic music producer and DJ",
        location="Miami, FL",
        created_at=datetime(2023, 3, 5, 9, 15, 0),
        updated_at=datetime(2023, 10, 12, 11, 20, 0)
    ),
    
    # Premium Users
    UserModel(
        user_id=4,
        username="premium_listener",
        email="premium@example.com",
        password_hash="$2b$12$hashed_password_premium",
        first_name="Sarah",
        last_name="Wilson",
        role="premium",
        is_active=True,
        date_of_birth=datetime(1985, 7, 14),
        phone_number="+1444567890",
        profile_picture_url="https://example.com/profiles/sarah_wilson.jpg",
        bio="Classical music aficionado and concert organizer",
        location="Chicago, IL",
        created_at=datetime(2023, 4, 20, 16, 45, 0),
        updated_at=datetime(2023, 11, 8, 10, 30, 0)
    ),
    
    UserModel(
        user_id=5,
        username="jazz_enthusiast",
        email="jazz.lover@example.com",
        password_hash="$2b$12$hashed_password_jazz",
        first_name="Miles",
        last_name="Davis",
        role="premium",
        is_active=True,
        date_of_birth=datetime(1982, 3, 22),
        phone_number="+1333789012",
        profile_picture_url="https://example.com/profiles/miles_davis.jpg",
        bio="Jazz musician and music teacher",
        location="New Orleans, LA",
        created_at=datetime(2023, 5, 12, 11, 20, 0),
        updated_at=datetime(2023, 12, 15, 13, 45, 0)
    ),
    
    # Admin Users
    UserModel(
        user_id=6,
        username="admin_user",
        email="admin@example.com",
        password_hash="$2b$12$hashed_password_admin",
        first_name="Admin",
        last_name="User",
        role="admin",
        is_active=True,
        date_of_birth=datetime(1980, 1, 1),
        phone_number="+1111222333",
        profile_picture_url="https://example.com/profiles/admin.jpg",
        bio="Platform administrator",
        location="San Francisco, CA",
        created_at=datetime(2023, 1, 1, 8, 0, 0),
        updated_at=datetime(2023, 12, 1, 9, 0, 0)
    ),
    
    # Inactive User (for testing)
    UserModel(
        user_id=7,
        username="inactive_user",
        email="inactive@example.com",
        password_hash="$2b$12$hashed_password_inactive",
        first_name="Inactive",
        last_name="User",
        role="user",
        is_active=False,
        date_of_birth=datetime(1992, 11, 30),
        phone_number="+1222333444",
        profile_picture_url="https://example.com/profiles/inactive.jpg",
        bio="Former user account",
        location="Seattle, WA",
        created_at=datetime(2023, 6, 8, 13, 10, 0),
        updated_at=datetime(2023, 8, 10, 15, 20, 0)
    ),
    
    # Recently Joined Users
    UserModel(
        user_id=8,
        username="new_member",
        email="newbie@example.com",
        password_hash="$2b$12$hashed_password_new",
        first_name="Emma",
        last_name="Brown",
        role="user",
        is_active=True,
        date_of_birth=datetime(2000, 4, 18),
        phone_number="+1777888999",
        profile_picture_url=None,  # No profile picture yet
        bio="New to the platform, love discovering music!",
        location="Austin, TX",
        created_at=datetime(2023, 12, 1, 12, 0, 0),
        updated_at=datetime(2023, 12, 1, 12, 0, 0)
    ),
    
    UserModel(
        user_id=9,
        username="rock_fan_2023",
        email="rock.fan@example.com",
        password_hash="$2b$12$hashed_password_rock",
        first_name="David",
        last_name="Rodriguez",
        role="user",
        is_active=True,
        date_of_birth=datetime(1993, 8, 7),
        phone_number="+1666777888",
        profile_picture_url="https://example.com/profiles/david_rodriguez.jpg",
        bio="Rock and metal music collector",
        location="Denver, CO",
        created_at=datetime(2023, 11, 15, 18, 30, 0),
        updated_at=datetime(2023, 12, 10, 20, 15, 0)
    ),
    
    # User with minimal info (for edge case testing)
    UserModel(
        user_id=10,
        username="minimal_user",
        email="minimal@example.com",
        password_hash="$2b$12$hashed_password_minimal",
        first_name="Min",
        last_name="User",
        role="user",
        is_active=True,
        date_of_birth=None,  # Optional field
        phone_number=None,   # Optional field
        profile_picture_url=None,
        bio=None,
        location=None,
        created_at=datetime(2023, 10, 20, 9, 45, 0),
        updated_at=datetime(2023, 10, 20, 9, 45, 0)
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

def get_users_by_location(location: str) -> list[UserModel]:
    """Get users from a specific location."""
    return [user for user in MOCK_USERS if user.location and location.lower() in user.location.lower()]

def get_active_users() -> list[UserModel]:
    """Get all active mock users."""
    return [user for user in MOCK_USERS if user.is_active]

def get_inactive_users() -> list[UserModel]:
    """Get all inactive mock users."""
    return [user for user in MOCK_USERS if not user.is_active]

def get_users_with_profile_pictures() -> list[UserModel]:
    """Get users who have profile pictures."""
    return [user for user in MOCK_USERS if user.profile_picture_url]

def get_users_without_profile_pictures() -> list[UserModel]:
    """Get users who don't have profile pictures."""
    return [user for user in MOCK_USERS if not user.profile_picture_url]

def get_recently_joined_users(days: int = 30) -> list[UserModel]:
    """Get users who joined within the last specified days."""
    cutoff_date = datetime.now() - datetime.timedelta(days=days)
    return [user for user in MOCK_USERS if user.created_at >= cutoff_date]

def get_user_for_create_test() -> dict:
    """Get user data for POST/create tests (as dict for JSON serialization)."""
    return {
        "username": "test_new_user",
        "email": "test.new@example.com",
        "password": "testpassword123",
        "first_name": "Test",
        "last_name": "User",
        "role": "user",
        "date_of_birth": "1995-06-15",
        "phone_number": "+1999888777",
        "bio": "Test user for API testing",
        "location": "Test City, TS"
    }

def get_user_for_update_test() -> dict:
    """Get user data for PUT/update tests (as dict for JSON serialization)."""
    return {
        "username": "updated_test_user",
        "first_name": "Updated",
        "last_name": "TestUser",
        "bio": "Updated bio for testing",
        "location": "Updated City, UC",
        "phone_number": "+1888777666"
    }

def get_invalid_user_data() -> list[dict]:
    """Get invalid user data for validation testing."""
    return [
        {
            # Missing required fields
            "first_name": "Test",
            "last_name": "User"
        },
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
            "username": "john_doe",  # Existing username
            "email": "newemail@example.com",
            "password": "password123"
        },
        {
            "username": "newuser",
            "email": "john.doe@example.com",  # Existing email
            "password": "password123"
        },
        {
            "username": "testuser",
            "email": "test@example.com",
            "phone_number": "invalid-phone"  # Invalid phone format
        }
    ]

def get_user_search_queries() -> list[dict]:
    """Get sample search queries for user search testing."""
    return [
        {"query": "john", "expected_count": 1},
        {"query": "user", "expected_count": 4},  # Users with "user" in username
        {"query": "music", "expected_count": 2}, # music_maven and music.maven@example.com
        {"query": "nonexistent", "expected_count": 0},
        {"query": "", "expected_count": len(MOCK_USERS)},  # Empty query returns all
    ]

# =============================================================================
# USER PREFERENCES AND SETTINGS MOCK DATA
# =============================================================================

MOCK_USER_PREFERENCES = [
    {
        "user_id": 1,
        "preferred_genres": ["Rock", "Pop", "Alternative"],
        "notification_settings": {
            "email_notifications": True,
            "push_notifications": True,
            "marketing_emails": False
        },
        "privacy_settings": {
            "profile_visibility": "public",
            "show_listening_history": True,
            "show_playlists": True
        },
        "playback_settings": {
            "auto_play": True,
            "shuffle_default": False,
            "volume_level": 75
        }
    },
    {
        "user_id": 2,
        "preferred_genres": ["Indie", "Folk", "Alternative"],
        "notification_settings": {
            "email_notifications": True,
            "push_notifications": False,
            "marketing_emails": True
        },
        "privacy_settings": {
            "profile_visibility": "friends",
            "show_listening_history": False,
            "show_playlists": True
        },
        "playback_settings": {
            "auto_play": False,
            "shuffle_default": True,
            "volume_level": 60
        }
    },
    # Add more preferences as needed...
]

# =============================================================================
# SUMMARY STATISTICS FOR TEST VALIDATION
# =============================================================================

MOCK_DATA_STATS = {
    "total_users": len(MOCK_USERS),
    "active_users": len(get_active_users()),
    "inactive_users": len(get_inactive_users()),
    "roles": list(set(user.role for user in MOCK_USERS)),
    "locations": list(set(user.location for user in MOCK_USERS if user.location)),
    "users_with_photos": len(get_users_with_profile_pictures()),
    "admin_count": len(get_users_by_role("admin")),
    "premium_count": len(get_users_by_role("premium")),
    "regular_count": len(get_users_by_role("user")),
}

def print_mock_data_summary():
    """Print a summary of the mock data for debugging tests."""
    print("👥 User Service Mock Data Summary:")
    print(f"   Total Users: {MOCK_DATA_STATS['total_users']}")
    print(f"   Active: {MOCK_DATA_STATS['active_users']}, Inactive: {MOCK_DATA_STATS['inactive_users']}")
    print(f"   Roles: {', '.join(MOCK_DATA_STATS['roles'])}")
    print(f"   Users with photos: {MOCK_DATA_STATS['users_with_photos']}")
    print(f"   Admin: {MOCK_DATA_STATS['admin_count']}, Premium: {MOCK_DATA_STATS['premium_count']}, Regular: {MOCK_DATA_STATS['regular_count']}")

if __name__ == "__main__":
    # If run directly, print summary of mock data
    print_mock_data_summary()
