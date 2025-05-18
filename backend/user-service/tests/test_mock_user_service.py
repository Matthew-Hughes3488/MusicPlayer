import pytest
from services.mock_user_service import MockUserService
from repos.mock_user_repo import MockUserRepository
from models.user_input_model import UserInputModel
from models.user_model import UserModel

@pytest.fixture
def service():
    repo = MockUserRepository()
    return MockUserService(repo)

def test_get_all_users(service):
    users = service.get_all_users()
    assert isinstance(users, list)
    assert all(isinstance(u, UserModel) for u in users)

def test_get_user_by_id(service):
    user = service.get_user_by_id(2)
    assert user is not None
    assert user.id == 2

def test_create_new_user(service):
    input_data = UserInputModel(
        email="serviceuser@example.com",
        password="pw",
        first_name="Service",
        last_name="User"
    )
    new_user = service.create_new_user(input_data)
    assert new_user.email == "serviceuser@example.com"
    assert new_user.id is not None

def test_update_user(service):
    input_data = UserInputModel(
        email="update@example.com",
        password="pw",
        first_name="Update",
        last_name="User"
    )
    new_user = service.create_new_user(input_data)
    updated_input = UserInputModel(
        email="updated@example.com",
        password="pw",
        first_name="Updated",
        last_name="User"
    )
    updated_user = service.update_user(new_user.id, updated_input)
    assert updated_user.email == "updated@example.com"
    assert updated_user.first_name == "Updated"