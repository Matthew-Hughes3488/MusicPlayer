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
        connector = DatabaseConnector()
        db = connector.get_session()
        try:
            yield db
        finally:
            db.close()

    def get_user(self, user_id: int) -> Optional[User]:
        """Retrieve a user by ID."""
        try:
            with self.get_session() as db:
                return db.query(User).filter(User.id == user_id).first()
        except Exception as e:
            print(f"Error retrieving user {user_id}: {e}")
            return None

    def create_user(self, user: User) -> Optional[User]:
        """Create a new user."""
        try:
            with self.get_session() as db:
                db.add(user)
                db.commit()
                db.refresh(user)
            return user 
        except Exception as e:
            print(f"Error creating user: {e}")
            return None

        
    def update_user(self, user_id: int, user_data: UserUpdateModel) -> Optional[User]:
        """Update an existing user."""
        try:
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
        except Exception as e:
            print(f"Error updating user {user_id}: {e}")
            return None
    
    def delete_user(self, user_id: int) -> bool:
        """Delete a user by ID."""
        try:
            with self.get_session() as db:
                user = db.query(User).filter(User.id == user_id).first()
                if not user:
                    return False
                db.delete(user)
                db.commit()
            return True
        except Exception as e:
            print(f"Error deleting user {user_id}: {e}")
            return False
    
    def list_users(self) -> List[User]:
        """List all users."""
        try:
            with self.get_session() as db:
                return db.query(User).all()
        except Exception as e:
            print(f"Error listing users: {e}")
            return []
    
    def get_user_by_email(self, email: str) -> Optional[User]:
        """Retrieve a user by email."""
        try:
            with self.get_session() as db:
                return db.query(User).filter(User.email == email).first()
        except Exception as e:
            print(f"Error retrieving user by email {email}: {e}")
            return None

    
