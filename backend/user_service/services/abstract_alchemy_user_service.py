from abc import ABC, abstractmethod
from typing import List, Optional
from backend.database.models.user_model import User
from backend.user_service.models.user_update_model import UserUpdateModel
from backend.user_service.models.user_model import UserModel
from backend.user_service.repos.abstract_alchemy_user_repo import AbstractAlchemyUserRepo

class AbstractAlchemyUserService(ABC):

    @abstractmethod
    def get_user(self, user_id: str) -> Optional[UserModel]:
        pass

    @abstractmethod
    def create_user(self, user: User) -> Optional[UserModel]:
        pass

    @abstractmethod
    def update_user(self, user_id: str, user_data: UserUpdateModel) -> Optional[UserModel]:
        pass

    @abstractmethod
    def delete_user(self, user_id: str) -> bool:
        pass

    @abstractmethod
    def list_users(self) -> List[UserModel]:
        pass

    @abstractmethod
    def get_user_by_email(self, email: str) -> Optional[UserModel]:
        """Retrieve a user by email."""
        pass
