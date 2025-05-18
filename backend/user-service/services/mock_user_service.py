from typing import List
from datetime import datetime
from models.user_model import UserModel
from models.user_input_model import UserInputModel
from utils.security import hash_password
from errors_exceptions.exceptions import UserNotFoundError
from services.user_service import UserService

class MockUserService(UserService):
    def __init__(self, user_repo):
        self.user_repo = user_repo
        
    def get_all_users(self) -> List[UserModel]:
        return self.user_repo.get_all_users()

    def get_user_by_id(self, id: int) -> UserModel:
        user = self.user_repo.get_user_by_id(id)
        if not user:
            raise UserNotFoundError(f'User with id {id} not found')
        return user

    def create_new_user(self, input: UserInputModel) -> UserModel:
        new_id = len(self.get_all_users()) + 1
        password = hash_password(input.password)
        
        new_user = UserModel(
            id=new_id,
            email=input.email, 
            password=password,
            first_name=input.first_name, 
            last_name=input.last_name,
            created_at=datetime.utcnow(),
            updated_at=None
        )
        
        self.user_repo.create_user(new_user)
        return new_user
    
    def update_user(self, id: int, user_input: UserModel) -> UserModel:
        user = self.get_user_by_id(id)
        
        user.email = user_input.email
        user.first_name = user_input.first_name
        user.last_name = user_input.last_name
        user.updated_at = datetime.utcnow()
        
        self.user_repo.update_user(id, user)
        return user
    
    def delete_user(self, id: int) -> None:
        user = self.get_user_by_id(id)
        if not user:
            raise UserNotFoundError(f'User with id {id} not found')
        
        self.user_repo.remove_user(id)
    
    def get_user_by_email(self, email: str) -> UserModel:
        user = self.user_repo.get_user_by_email(email)
        if not user:
            raise UserNotFoundError(f'User with email {email} not found')
        return user