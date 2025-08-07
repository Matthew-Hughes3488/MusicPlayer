from fastapi import Request, HTTPException, status
from backend.album_service.utils.jwt_utils import verify_access_token

class AuthChecker():
    @staticmethod
    def authorize_request(request: Request):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing or invalid Authorization header")
        token = auth_header.split(" ")[1]
        try:
            payload = verify_access_token(token)
            return payload  # You can return user info from the payload
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")