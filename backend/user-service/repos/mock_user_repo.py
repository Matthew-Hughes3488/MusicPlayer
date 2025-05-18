from typing import List, Optional
from models.user_input_model import UserInputModel
from models.user_model import UserModel
from models.user_input_model import UserModelInput
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

    #TODO: REMOVE LOGIC HERE AND MOVE TO SERVICE LAYER
    def update_user(self, id: int, user_input: UserModelInput) -> Optional[UserModel]:
        if not user_input or not id:
            return None

        users = self.get_all_users()
        user = self.get_user_by_id(id)
        if not user:
            return None
        users.remove(user)
        
        if user_input.email:
            user.email = user_input.email
        if user_input.password:
            user.password = user_input.password
        if user_input.first_name:
            user.first_name = user_input.first_name
        if user_input.last_name:
            user.last_name = user_input.last_name
        users.append(user)
        return user