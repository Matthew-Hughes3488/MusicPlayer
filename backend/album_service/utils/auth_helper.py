from fastapi import Depends, Request, HTTPException
from backend.album_service.utils.jwt_utils import verify_access_token

class AuthHelper:
    def __init__(self, allowed_roles=None):
        self.allowed_roles = allowed_roles

    def _extract_token(self, request: Request) -> str:
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
        return auth_header[7:]

    def _verify_and_check_role(self, token: str):
        payload = verify_access_token(token)
        if self.allowed_roles and payload.get("role") not in self.allowed_roles:
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return payload

    def require_auth(self):
        async def dependency(request: Request):
            token = self._extract_token(request)
            payload = self._verify_and_check_role(token)
            return payload 
        return Depends(dependency)

    def require_role(self, *roles):
        async def dependency(request: Request):
            token = self._extract_token(request)
            payload = verify_access_token(token)
            if payload.get("role") not in roles:
                raise HTTPException(status_code=403, detail="Insufficient permissions")
            return payload
        return Depends(dependency)

auth_helper = AuthHelper()