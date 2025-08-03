from backend.auth_service.security_utils import password_manager
from backend.auth_service.model.user_model import UserModel
from backend.auth_service.model.auth_models import LoginResponse, LoginRequest
from backend.auth_service.jwt_utils import create_access_token
from backend.auth_service.model.jwt_payload import JWTPayload
from backend.auth_service.exceptions.auth_exceptions import AuthenticationError, UserNotFoundError
import requests
import time


class AuthService:
    def __init__(self, user_service_url: str):
        self.user_service_url = user_service_url

    def login(self, login_request: LoginRequest) -> LoginResponse:
        """Login user and return JWT token."""
        try:
            user = self.get_user_by_email(login_request.email)
            if user and self.verify_password(login_request.password, user['password_hash']):
                token = self.generate_token(UserModel(**user))
                return LoginResponse(auth_token=token, user_id=user['id'], username=user['username'], email=user['email'])
            return None
        except Exception as e:
            print(f"Login failed: {e}")
            return None
        
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        is_valid = password_manager.verify_password(plain_password, hashed_password)
        if not is_valid:
            raise AuthenticationError("Invalid password")
        return is_valid

    def get_user_by_email(self, email: str):
        """Fetch user details by email from the user service."""
        try:
            print(f'Sending request to user service at {self.user_service_url}/users/email/{email}')
            response = requests.get(f"{self.user_service_url}/users/email/{email}")
            if response.status_code == 404:
                raise UserNotFoundError(f"User with email {email} not found")
            return response.json() if response.status_code == 200 else None
        except Exception as e:
            print(f"Error fetching user by email: {e}")
            return None

    def generate_token(self, user: UserModel) -> str:
        """Generate a JWT token for the user."""
        try:
            payload = self.generate_jwt_claim(user)
            return create_access_token(payload)
        except Exception as e:
            print(f"Error generating token: {e}")
            return None

    def generate_jwt_claim(self, user: UserModel) -> JWTPayload:
        """Generate JWT claims from the user model."""
        return JWTPayload(
            sub=user.id,
            name=user.username,
            email=user.email,
            exp=int(time.time()) + 3600,  # Token valid for 1 hour
            iat=int(time.time()),  # Issued at time
            role="user"  # Default for now, can be extended later
        )