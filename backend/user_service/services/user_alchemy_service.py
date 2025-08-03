from backend.user_service.models.user_update_model import UserUpdateModel
from backend.user_service.models.user_input_model import UserInputModel
from backend.user_service.repos.abstract_alchemy_user_repo import AbstractAlchemyUserRepo
from backend.user_service.models.user_model import UserModel
from backend.database.models.user_model import User
from backend.user_service.utils.model_to_model_mapper import ModelToModelMapper
from backend.user_service.errors_exceptions.exceptions import UserNotFoundError
from typing import List, Optional
from backend.user_service.utils.security import password_manager

class UserAlchemyService:
    def __init__(self, repo: AbstractAlchemyUserRepo):
        self.repo = repo
        self.mapper = ModelToModelMapper()

    def get_user_by_id(self, user_id: int) -> UserModel:
        user = self.repo.get_user(user_id)
        if not user:
            raise UserNotFoundError(f"User with id {user_id} not found")
        return self.mapper.db_model_to_user_output(user)

    def get_all_users(self) -> List[UserModel]:
        users = self.repo.list_users()
        return [self.mapper.db_model_to_user_output(user) for user in users if user]

    def create_new_user(self, user_input: UserInputModel) -> Optional[UserModel]:
        user_db = self.mapper.user_input_to_db_model(user_input)
        created_user = self.repo.create_user(user_db)
        if created_user:
            return self.mapper.db_model_to_user_output(created_user)
        return None

    def update_user(self, user_id: int, user_data: UserUpdateModel) -> UserModel:
        if hasattr(user_data, 'password') and user_data.password:
            user_data.password_hash = password_manager.hash_password(user_data.password)
        updated_user = self.repo.update_user(user_id, user_data)
        if not updated_user:
            raise UserNotFoundError(f"User with id {user_id} not found")
        return self.mapper.db_model_to_user_output(updated_user)

    def remove_user(self, user_id: int) -> bool:
        if not self.repo.get_user(user_id):
            raise UserNotFoundError(f"User with id {user_id} not found")
        return self.repo.delete_user(user_id)
