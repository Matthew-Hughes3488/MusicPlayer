from fastapi import APIRouter, Depends, HTTPException
from typing import List
from backend.user_service.models.user_model import UserModel
from backend.user_service.models.user_input_model import UserInputModel
from backend.user_service.models.user_update_model import UserUpdateModel
from backend.user_service.models.auth_info_model import AuthInfoModel
from backend.user_service.services.user_alchemy_service import UserAlchemyService
from backend.user_service.repos.user_alchemy_repo import UserAlchemyRepo
from backend.user_service.errors_exceptions.exceptions import UserNotFoundError
from backend.user_service.utils.auth_helper import auth_helper

router = APIRouter()

def get_user_service() -> UserAlchemyService:
    return UserAlchemyService(repo=UserAlchemyRepo())

@router.get("/users", response_model=List[UserModel])
def get_all_users(current_user=auth_helper.require_auth(), user_service=Depends(get_user_service)):
    return user_service.get_all_users()

@router.get("/users/{user_id}", response_model=UserModel)
def get_user_by_id(user_id: int, current_user=auth_helper.require_auth(), user_service=Depends(get_user_service)):
    try:
        return user_service.get_user_by_id(user_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
@router.get("/users/email/{email}", response_model=AuthInfoModel)
def get_user_by_email(email: str, user_service=Depends(get_user_service)):
    try:
        return user_service.get_user_by_email(email)
    except UserNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/users", response_model=UserModel)
def create_user(user_input: UserInputModel, user_service=Depends(get_user_service)):
    try:
        return user_service.create_new_user(user_input)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/users/{user_id}", response_model=UserModel)
def update_user(user_id: int, user_input: UserUpdateModel, current_user=auth_helper.require_role("admin"), user_service=Depends(get_user_service)):
    try:
        return user_service.update_user(user_id, user_input)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))
    except UserNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/users/{user_id}")
def delete_user(user_id: int, current_user=auth_helper.require_role("admin"), user_service=Depends(get_user_service)):
    try:
        user_service.remove_user(user_id)
        return {"detail": "User deleted"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))