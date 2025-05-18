from abc import ABC, abstractmethod
from models.user_model import UserModel
from typing import Optional

class UserRepository(ABC):
    @abstractmethod
    def get_user_by_id(self, user_id: str) -> Optional[UserModel]:
        """
        Get a user by their ID.
        :param user_id: The ID of the user to retrieve.
        :return: The user object if found, None otherwise.
        """
        pass
    @abstractmethod
    def get_all_users(self) -> list[UserModel]:
        """
        Get all users.
        :return: A list of all user objects.
        """
        pass
    @abstractmethod
    def create_user(self, user) -> Optional[UserModel]:
        """
        Create a new user.
        :param user: The user object to create.
        :return: The created user object.
        """
        pass
    @abstractmethod
    def update_user(self, user_id: str, user: UserModel) -> Optional[UserModel]:
        """
        Update an existing user.
        :param user_id: The ID of the user to update.
        :param user: The updated user object.
        :return: The updated user object if successful, None otherwise.
        """
        pass
    @abstractmethod
    def remove_user(self, user_id: str) -> None:
        """
        Delete a user by their ID.
        :param user_id: The ID of the user to delete.
        :return: None
        """
        pass