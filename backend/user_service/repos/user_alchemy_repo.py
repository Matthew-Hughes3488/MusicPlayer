from backend.user_service.models.user_update_model import UserUpdateModel
from backend.user_service.repos.abstract_alchemy_user_repo import AbstractAlchemyUserRepo
from backend.database.models.user_model import User
from backend.database.connector.connector import DatabaseConnector
from typing import List, Optional
from contextlib import contextmanager

class UserAlchemyRepo(AbstractAlchemyUserRepo):
    @contextmanager
    def get_session(self):
        """Context manager to handle database sessions."""
        db = DatabaseConnector.get_session()
        try:
            yield db
        finally:
            db.close()

    def get_user(self, user_id) -> Optional[User]:
        """Retrieve a user by ID."""
        with self.get_session() as db:
            return db.query(User).filter(User.id == user_id).first()

    def create_user(self, user: User) -> Optional[User]:
        """Create a new user."""
        with self.get_session() as db:
            db.add(user)
            db.commit()
            db.refresh(user)
        return user
    
    def update_user(self, user_id: str, user_data: UserUpdateModel) -> Optional[User]:
        """Update an existing user."""
        with self.get_session() as db:
            user = db.query(User).filter(User.id == user_id).first()
            if not user:
                return None
            for key, value in user_data.model_dump(exclude_unset=True).items():
                if hasattr(user, key):
                    setattr(user, key, value)
            db.commit()
            db.refresh(user)
        return user
    
    def delete_user(self, user_id: str) -> bool:
        """Delete a user by ID."""
        with self.get_session() as db:
            user = db.query(User).filter(User.id == user_id).first()
            if not user:
                return False
            db.delete(user)
            db.commit()
        return True
    
    def list_users(self) -> List[User]:
        """List all users."""
        with self.get_session() as db:
            return db.query(User).all()

    
