from backend.auth_service.security_utils import password_manager
from backend.auth_service.model.auth_info_model import AuthInfoModel
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
        user = self.get_user_by_email(login_request.email)
        if not user:
            raise AuthenticationError("Invalid credentials")
            
        if not self.verify_password(login_request.password, user['password_hash']):
            raise AuthenticationError("Invalid credentials")
            
        token = self.generate_token(AuthInfoModel(**user))
        if not token:
            raise Exception("Failed to generate authentication token")
            
        return LoginResponse(auth_token=token, user_id=user['user_id'])
        
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return password_manager.verify_password(plain_password, hashed_password)

    def get_user_by_email(self, email: str):
        """Fetch user details by email from the user service."""
        try:
            print(f'Sending request to user service at {self.user_service_url}/users/email/{email}')
            response = requests.get(f"{self.user_service_url}/users/email/{email}")
            if response.status_code == 404:
                return None  # User not found - let login method handle this
            elif response.status_code == 200:
                return response.json()
            else:
                raise Exception(f"User service returned status {response.status_code}")
        except requests.RequestException as e:
            raise Exception(f"Failed to connect to user service: {e}")
        except Exception as e:
            raise Exception(f"Error fetching user by email: {e}")

    def generate_token(self, user: AuthInfoModel) -> str:
        """Generate a JWT token for the user."""
        try:
            payload = self.generate_jwt_claim(user)
            return create_access_token(payload)
        except Exception as e:
            print(f"Error generating token: {e}")
            return None

    def generate_jwt_claim(self, user: AuthInfoModel) -> JWTPayload:
        """Generate JWT claims from the user model."""
        return JWTPayload(
            sub=str(user.user_id),
            exp=int(time.time()) + 3600,  # Token valid for 1 hour
            iat=int(time.time()),  # Issued at time
            role=user.role  # Default for now, can be extended later
        )