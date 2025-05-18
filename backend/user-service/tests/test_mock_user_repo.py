import pytest
from repos.mock_user_repo import MockUserRepository
from models.user_model import UserModel
from datetime import datetime

@pytest.fixture
def repo():
    return MockUserRepository()

def test_get_all_users(repo):
    users = repo.get_all_users()
    assert isinstance(users, list)
    assert all(isinstance(u, UserModel) for u in users)

def test_get_user_by_id(repo):
    user = repo.get_user_by_id(1)
    assert user is not None
    assert user.id == 1

def test_get_user_by_id_not_found(repo):
    user = repo.get_user_by_id(999)
    assert user is None

def test_create_user(repo):
    new_user = UserModel(
        id=99,
        email="test@example.com",
        password="hashed_pw",
        first_name="Test",
        last_name="User",
        created_at=datetime.utcnow(),
        updated_at=None
    )
    repo.create_user(new_user)
    assert repo.get_user_by_id(99) is not None
    assert repo.get_user_by_id(99) == new_user

def test_update_user(repo):
    new_user = UserModel(
        id=99,
        email="test@example.com",
        password="hashed_pw",
        first_name="Test",
        last_name="User",
        created_at=datetime.utcnow(),
        updated_at=None
    )
    created_user = repo.create_user(new_user)
    assert created_user == new_user
    
def test_remove_user(repo):
    repo.remove_user(1)
    assert repo.get_user_by_id(1) is None

def test_get_user_by_email(repo):
    new_user = UserModel(
        id=99,
        email="testMe@gmail.com",
        password="hashed_pw",
        first_name="Test",
        last_name="User",
        created_at=datetime.utcnow(),
        updated_at=None
    )
    repo.create_user(new_user)
    user = repo.get_user_by_email("testMe@gmail.com")
    assert user is not None
    assert user == new_user