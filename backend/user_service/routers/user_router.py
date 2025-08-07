from fastapi import APIRouter, HTTPException, Depends, Request, status
from backend.user_service.utils.jwt_utils import verify_access_token
from typing import List
from backend.user_service.models.user_model import UserModel
from backend.user_service.models.user_input_model import UserInputModel
from backend.user_service.models.user_update_model import UserUpdateModel
from backend.user_service.services.user_alchemy_service import UserAlchemyService
from backend.user_service.repos.user_alchemy_repo import UserAlchemyRepo
from backend.user_service.errors_exceptions.exceptions import UserNotFoundError

router = APIRouter()
user_service = UserAlchemyService(repo=UserAlchemyRepo())

def authorize_request(request: Request, required_role: str = None):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing or invalid Authorization header")
    token = auth_header.split(" ")[1]
    try:
        payload = verify_access_token(token)
        if required_role and payload.get("role") != required_role:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
        return payload
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

@router.get("/users", response_model=List[UserModel])
def get_all_users(current_user=Depends(authorize_request())):
    return user_service.get_all_users()

@router.get("/users/{user_id}", response_model=UserModel)
def get_user_by_id(user_id: int, current_user=Depends(authorize_request())):
    try:
        return user_service.get_user_by_id(user_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
@router.get("/users/email/{email}", response_model=UserModel)
def get_user_by_email(email: str,):
    try:
        return user_service.get_user_by_email(email)
    except UserNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/users", response_model=UserModel)
def create_user(user_input: UserInputModel, current_user=Depends(authorize_request("admin"))):
    try:
        return user_service.create_new_user(user_input)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/users/{user_id}", response_model=UserModel)
def update_user(user_id: int, user_input: UserUpdateModel, current_user=Depends(authorize_request("admin"))):
    try:
        return user_service.update_user(user_id, user_input)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))
    except UserNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/users/{user_id}")
def delete_user(user_id: int, current_user=Depends(authorize_request("admin"))):
    try:
        user_service.remove_user(user_id)
        return {"detail": "User deleted"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))