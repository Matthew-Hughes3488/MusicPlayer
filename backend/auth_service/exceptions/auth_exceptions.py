class AuthenticationError(Exception):
    pass

class UserNotFoundError(AuthenticationError):
    pass

class InvalidPasswordError(AuthenticationError):
    pass

class UserServiceUnavailableError(Exception):
    pass