#create a mock user service interface
from typing import List, Optional
from models.user_model import UserModel
from models.user_input_model import UserInputModel
from abc import ABC, abstractmethod          

class UserService(ABC):
    @abstractmethod
    def get_all_users(self) -> List[UserModel]:
        """
        Get all users.
        :return: A list of all user objects.
        """
        pass

    @abstractmethod
    def get_user_by_id(self, id: int) -> UserModel:
        """
        Get a user by their ID.
        :param id: The ID of the user to retrieve.
        :return: The user object if found, None otherwise.
        """
        pass

    @abstractmethod
    def create_new_user(self, input: UserInputModel) -> UserModel:
        """
        Create a new user.
        :param input: The user input object to create.
        :return: The created user object.
        """
        pass
    @abstractmethod
    def update_user(self, id: int, user_input: UserModel) -> Optional[UserModel]:
        """
        Update an existing user.
        :param id: The ID of the user to update.
        :param user_input: The updated user object.
        :return: The updated user object if successful, None otherwise.
        """
        pass