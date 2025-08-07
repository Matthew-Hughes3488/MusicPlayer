from backend.user_service.models.user_update_model import UserUpdateModel
from backend.user_service.models.user_input_model import UserInputModel
from backend.user_service.models.auth_info_model import AuthInfoModel
from backend.user_service.models.user_model import UserModel
from backend.database.models.user_model import User
from backend.user_service.utils.security import password_manager

class ModelToModelMapper:
    @staticmethod
    def user_input_to_db_model(user_input: UserInputModel) -> User:
        """Convert UserInputModel to User database model."""
        if not all([user_input.username, user_input.email, user_input.password, user_input.first_name]):
            raise ValueError("Required fields are missing in UserInputModel")
        
        return User(
            username=user_input.username,
            email=user_input.email,
            password_hash=password_manager.hash_password(user_input.password),
            first_name=user_input.first_name,
            last_name=user_input.last_name,
            created_at=user_input.created_at
        )

    @staticmethod
    def db_model_to_user_output(db_model: User) -> UserModel:
        """Convert User database model to UserModel."""
        return UserModel(
            id=db_model.id,
            username=db_model.username,
            email=db_model.email,
            password_hash=db_model.password_hash,
            first_name=db_model.first_name,
            last_name=db_model.last_name,
            created_at=db_model.created_at,
            updated_at=db_model.updated_at
        )
    
    @staticmethod
    def db_model_to_auth_info(db_model: User) -> AuthInfoModel:
        """Convert User database model to AuthInfoModel."""
        return AuthInfoModel(
            user_id=db_model.id,
            password_hash=db_model.password_hash,
            role=db_model.role if hasattr(db_model, 'role') else "user"
        )

