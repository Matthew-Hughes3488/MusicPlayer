from typing import List, Optional
from models.user_input_model import UserInputModel
from models.user_model import UserModel
from mock_data.mock_db import mock_users
from user_repository import UserRepository

class MockUserRepository(UserRepository):
    def get_all_users() -> List[UserModel] :
        return mock_users

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
    
    def remove_user(self, id: int) -> None:
        users = self.get_all_users()
        for user in users:
            if user.id == id:
                users.remove(user)
                break
        return None