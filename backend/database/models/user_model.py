from sqlalchemy import Column, Integer, String, DateTime
from base import Base

class User(Base):
    __tablename__ = "USERS"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255), nullable=False, unique=True)
    email = Column(String(255), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255))
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime)