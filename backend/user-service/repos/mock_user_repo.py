from typing import List, Optional
from models.user_input_model import UserInputModel
from models.user_model import UserModel
from mock_data.mock_db import mock_users
from repos.user_repository import UserRepository
from copy import deepcopy

class MockUserRepository(UserRepository):
    def __init__(self):
        from mock_data.mock_db import mock_users
        self.mock_users = deepcopy(mock_users)
        
    def get_all_users(self) -> List[UserModel] :
        return self.mock_users

    def get_user_by_id(self, id: int) -> Optional[UserModel]:
        users = self.get_all_users()
        for user in users:
            if user.id == id:
                return user
        return None

    def remove_user(self, id: int) -> None:
        users = self.get_all_users()
        for user in users:
            if user.id == id:
                users.remove(user)
                break
        return None

    def create_user(self, user: UserModel) -> UserModel:
        users = self.get_all_users()
        users.append(user)
        return user

    def update_user(self, id: int, user_input: UserModel) -> Optional[UserModel]:
        user = self.get_user_by_id(id)
        users = self.get_all_users()
        users.remove(user)
        users.append(user_input)
        return user_input
    
    def get_user_by_email(self, email: str) -> Optional[UserModel]:
        users = self.get_all_users()
        for user in users:
            if user.email == email:
                return user
        return None