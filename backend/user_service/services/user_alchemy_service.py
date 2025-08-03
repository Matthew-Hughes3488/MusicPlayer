from backend.user_service.models.user_update_model import UserUpdateModel
from backend.user_service.models.user_input_model import UserInputModel
from backend.user_service.repos.abstract_alchemy_user_repo import AbstractAlchemyUserRepo
from backend.user_service.models.user_model import UserModel
from backend.database.models.user_model import User
from backend.user_service.utils.model_to_model_mapper import ModelToModelMapper
from typing import List, Optional

class UserAlchemyService:
    def __init__(self, repo: AbstractAlchemyUserRepo):
        self.repo = repo
        self.mapper = ModelToModelMapper()

    def get_user_by_id(self, user_id: int) -> Optional[UserModel]:
        user = self.repo.get_user(user_id)
        if user:
            return self.mapper.db_model_to_user_output(user)
        return None

    def get_all_users(self) -> List[UserModel]:
        users = self.repo.list_users()
        return [self.mapper.db_model_to_user_output(user) for user in users if user]

    def create_new_user(self, user_input: UserInputModel) -> Optional[UserModel]:
        user_db = self.mapper.user_input_to_db_model(user_input)
        created_user = self.repo.create_user(user_db)
        if created_user:
            return self.mapper.db_model_to_user_output(created_user)
        return None

    def update_user(self, user_id: int, user_data: UserUpdateModel) -> Optional[UserModel]:
        updated_user = self.repo.update_user(user_id, user_data)
        if updated_user:
            return self.mapper.db_model_to_user_output(updated_user)
        return None

    def remove_user(self, user_id: int) -> bool:
        return self.repo.delete_user(user_id)
