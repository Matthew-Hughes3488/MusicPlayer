# Functions for creating and verifying JWT tokens

import os
from dotenv import load_dotenv
from jose import jwt
from backend.auth_service.model.jwt_payload import JWTPayload
load_dotenv()

# Get JWT configuration from environment variables
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-super-secret-key")  
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

def create_access_token(payload: JWTPayload) -> str:
    """
    Creates a JWT token from the payload.
    """
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def verify_access_token(token: str) -> dict:
    """
    Verifies the JWT token and returns the payload.
    Raises an exception if verification fails.
    """
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.JWTError as e:
        raise Exception(f"Token verification failed: {str(e)}")