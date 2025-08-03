from backend.user_service.models.user_update_model import UserUpdateModel
from backend.user_service.repos.abstract_alchemy_user_repo import AbstractAlchemyUserRepo
from backend.user_service.models.user_model import UserModel
from backend.database.models.user_model import User
from typing import List, Optional

class UserAlchemyService(AbstractAlchemyUserRepo):

    def get_user(self, user_id: str) -> Optional[UserModel]:
        return self.get_user(user_id)

    def create_user(self, user: UserModel) -> Optional[UserModel]:
        return self.create_user(user)

    def update_user(self, user_id: str, user_data: UserUpdateModel) -> Optional[UserModel]:
        return self.update_user(user_id, user_data)

    def delete_user(self, user_id: str) -> bool:
        return self.delete_user(user_id)

    def list_users(self) -> List[UserModel]:
        return self.list_users()
