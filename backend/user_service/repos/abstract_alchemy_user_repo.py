from abc import ABC, abstractmethod
from typing import List, Optional
from backend.database.models.user_model import User
from backend.user_service.models.user_update_model import UserUpdateModel

class AbstractAlchemyUserRepo(ABC):

    @abstractmethod
    def get_user(self, user_id: str) -> Optional[User]:
        pass

    @abstractmethod
    def create_user(self, user: User) -> Optional[User]:
        pass

    @abstractmethod
    def update_user(self, user_id: str, user_data: UserUpdateModel) -> Optional[User]:
        pass

    @abstractmethod
    def delete_user(self, user_id: str) -> bool:
        pass

    @abstractmethod
    def list_users(self) -> List[User]:
        pass
