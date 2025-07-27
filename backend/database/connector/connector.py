import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from backend.database.models.base import Base
from backend.database.models.album_model import Album
from backend.database.models.song_model import Song
from backend.database.models.user_model import User
load_dotenv()

class DatabaseConnector:
    def __init__(self):
        self.DB_USER = os.getenv("DB_USER")
        self.DB_PASSWORD = os.getenv("DB_PASSWORD")
        self.DB_HOST = os.getenv("DB_HOST", "localhost")
        self.DB_PORT = os.getenv("DB_PORT", "3306")
        self.DB_NAME = os.getenv("DB_NAME")
        self.DATABASE_URL = (
            f"mysql+pymysql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )
        print("Connecting to database:", self.DATABASE_URL)
        self.engine = create_engine(self.DATABASE_URL, echo=True)
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)

        Base.metadata.create_all(bind=self.engine)

    def get_session(self):
        return self.SessionLocal()