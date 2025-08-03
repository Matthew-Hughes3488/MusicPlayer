from backend.user_service.models.user_update_model import UserUpdateModel
from backend.user_service.models.user_model import UserModel
from backend.database.models.user_model import User

class ModelToModelMapper:
    @staticmethod
    def user_input_to_db_model(user_input: UserUpdateModel) -> User:
        """Convert UserUpdateModel to User."""
        if not all([user_input.email, user_input.first_name, user_input.password]):
            return None
        return User(
            email=user_input.email,
            first_name=user_input.first_name,
            last_name=user_input.last_name,
            password=user_input.password
        )

    @staticmethod
    def db_model_to_user_output(db_model: User) -> UserModel:
        pass

