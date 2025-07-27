from backend.album_service.repos.abstract_album_alchemy_repo import AbstractAlbumAlchemyRepository
from backend.database.models.album_model import Album
from backend.database.models.song_model import Song as SongModel
from backend.album_service.models.song import Song
from backend.album_service.models.album_input import AlbumInput
from backend.database.connector.connector import DatabaseConnector
from backend.album_service.utils.model_to_model_functions import ModelConverter
from typing import List, Optional
from contextlib import contextmanager
from sqlalchemy.orm import joinedload

class AlbumAlchemyRepository(AbstractAlbumAlchemyRepository):
    def __init__(self):
        super().__init__()
        self.model_converter = ModelConverter()


    @contextmanager
    def db_session(self):
        """Context manager for database session."""
        db = DatabaseConnector().get_session()
        try:
            yield db
        finally:
            db.close()

    def create_album(self, album: AlbumInput) -> Album:
        """Create a new album."""
        with self.db_session() as db:
            db.add(album)
            db.commit()
            db.refresh(album)
        return album
    
    def get_album_by_id(self, album_id: int) -> Optional[Album]:
        """Retrieve an album by its ID."""
        with self.db_session() as db:
            album = db.query(Album).filter(Album.id == album_id).first()
        return album
    
    def update_album(self, album: Album) -> Album:
        """Update an existing album."""
        with self.db_session() as db:
            existing_album = db.query(Album).filter(Album.id == album.id).first()
            if existing_album:
                for key, value in album.__dict__.items():
                    setattr(existing_album, key, value)
                db.commit()
                db.refresh(existing_album)
                return existing_album
            return None
        
    def delete_album(self, album_id: int) -> bool:
        """Delete an album by its ID."""
        with self.db_session() as db:
            album = db.query(Album).filter(Album.id == album_id).first()
            if album:
                db.delete(album)
                db.commit()
                return True
            return False
    
    def list_albums(self) -> List[Album]:
        """List all albums."""
        with self.db_session() as db:
            albums = db.query(Album).all()
        return albums
    
    def get_songs_by_album_id(self, album_id: int) -> List[Song]:
        """Retrieve all songs associated with a specific album."""
        with self.db_session() as db:
            album = db.query(Album).filter(Album.id == album_id).first()
            if album:
                return [self.model_converter.db_song_to_model(song) for song in album.songs]
        return None

    def db_song_to_model(self, song: SongModel) -> Song:
        return Song(
            id=song.id,
            title=song.title,
            artist=song.artist,
            genre=song.genre,
            file_url=song.file_url,
            duration=song.duration,
            description=song.description,
            cover_image_url=song.cover_image_url,
            release_date=song.release_date,
            created_at=song.created_at,
            updated_at=song.updated_at
        )