class SongNotFoundError(Exception):
    """Raised when a song cannot be found in the system."""
    pass

class PermissionDeniedError(Exception):
    """Raised when a user attempts an unauthorized action."""
    pass