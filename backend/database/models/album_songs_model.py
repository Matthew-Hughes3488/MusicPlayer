from sqlalchemy import Table, Column, Integer, ForeignKey
from backend.database.models.base import Base

album_songs = Table(
    "ALBUM_SONGS",
    Base.metadata,
    Column("album_id", Integer, ForeignKey("ALBUMS.id"), primary_key=True),
    Column("song_id", Integer, ForeignKey("SONGS.id"), primary_key=True),
)