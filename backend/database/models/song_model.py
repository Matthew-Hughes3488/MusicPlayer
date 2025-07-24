from sqlalchemy import Column, Integer, String, DateTime
from base import Base

class Song(Base):
    __tablename__ = "SONGS"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(100), nullable=False)
    artist = Column(String(100), nullable=False)
    genre = Column(String(50), nullable=False)
    file_url = Column(String(255), nullable=False)
    duration = Column(Integer)
    description = Column(String(500))
    cover_image_url = Column(String(255))
    release_date = Column(DateTime)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime)