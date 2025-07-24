from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base, relationship
from base import Base
from album_songs_model import album_songs

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
    songs = relationship("Song", secondary=album_songs, back_populates="Album")