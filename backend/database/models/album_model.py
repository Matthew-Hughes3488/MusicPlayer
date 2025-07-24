from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from base import Base

class Album(Base):
    __tablename__ = "ALBUMS"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(100), nullable=False)
    artist = Column(String(100), nullable=False)
    genre = Column(String(50), nullable=False)
    description = Column(String(500))
    cover_image_url = Column(String(255))
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime)