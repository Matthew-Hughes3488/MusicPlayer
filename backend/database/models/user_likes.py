from sqlalchemy import Table, Column, Integer, ForeignKey
from database.models.base import Base

user_likes = Table(
    "USER_LIKES",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("USERS.id"), primary_key=True),
    Column("song_id", Integer, ForeignKey("SONGS.id"), primary_key=True),
)