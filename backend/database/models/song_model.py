from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from backend.database.models.base import Base
from backend.database.models.album_songs_model import album_songs
from backend.database.models.user_likes import user_likes

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
    albums = relationship("Album", secondary=album_songs, back_populates="songs")
    user_likes = relationship("User", secondary=user_likes, back_populates="likes")