from typing import List
from models.user_model import UserModel
from models.user_input_model import UserInputModel
from repos import user_repo
from utils.security import hash_password
from exceptions import *

def get_all_users() -> List[UserModel]:
    return user_repo.get_all_users()

def get_user_by_id(id : int) -> UserModel:
    user = user_repo.get_user_by_id(id)
    if not user:
        raise UserNotFoundError(f'User with id {id} not found')
    return user

def create_new_user(input: UserInputModel) -> UserModel:
    new_id = len(get_all_users()) + 1
    password = hash_password(input.password)
    
    new_user = UserModel(
        email = input.email, 
        password = password
        first_name = input.first_name, 
        last_name = input.last_name,
        created_at=datetime.utcnow(),
        updated_at=None
        )
    
    user_repo.create_new_user(new_user)
    return new_user
    