class UserNotFoundError(Exception):
    """Raised when a user cannot be found in the system."""
    pass

class InvalidCredentialsError(Exception):
    """Raised when login credentials are invalid."""
    pass

class PermissionDeniedError(Exception):
    """Raised when a user attempts an unauthorized action."""
    pass