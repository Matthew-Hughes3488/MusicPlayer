from fastapi import APIRouter, HTTPException
from typing import List
from models.user_model import UserModel
from models.user_input_model import UserInputModel
from services.mock_user_service import MockUserService
from repos.mock_user_repo import MockUserRepository


router = APIRouter()
user_service = MockUserService(user_repo=MockUserRepository())

@router.get("/users", response_model=List[UserModel])
def get_all_users():
    return user_service.get_all_users()

@router.get("/users/{user_id}", response_model=UserModel)
def get_user_by_id(user_id: int):
    try:
        return user_service.get_user_by_id(user_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/users", response_model=UserModel)
def create_user(user_input: UserInputModel):
    return user_service.create_new_user(user_input)

@router.put("/users/{user_id}", response_model=UserModel)
def update_user(user_id: int, user_input: UserInputModel):
    return user_service.update_user(user_id, user_input)

@router.delete("/users/{user_id}")
def delete_user(user_id: int):
    user_service.remove_user(user_id)
    return {"detail": "User deleted"}