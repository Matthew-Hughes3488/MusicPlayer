from backend.song_service.repos.abstract_alchemy_song_repo import AbstractAlchemySongRepo
from backend.database.models.song_model import Song
from backend.song_service.models.song_update_input import SongUpdateInput
from backend.database.connector.connector import DatabaseConnector
from contextlib import contextmanager

class SongAlchemyRepository(AbstractAlchemySongRepo):
    @contextmanager
    def db_session(self):
        """Context manager for database session."""
        db = DatabaseConnector().get_session()
        try:
            yield db
        finally:
            db.close()
    
    def create_song(self, song: Song) -> Song:
        """Create a new song."""
        with self.db_session() as db:
            db.add(song)
            db.commit()
            db.refresh(song)
        return song
    
    def get_song_by_id(self, song_id: int) -> Song:
        """Retrieve a song by its ID."""
        with self.db_session() as db:
            song = db.query(Song).filter(Song.id == song_id).first()
        return song
    
    def update_song(self, song_id: int, song_input: SongUpdateInput) -> Song:
        """Update an existing song."""
        with self.db_session() as db:
            song = db.query(Song).filter(Song.id == song_id).first()
            if not song:
                return None
            
            for key, value in song_input.model_dump(exclude_unset=True).items():
                if hasattr(song, key):
                    setattr(song, key, value)
            
            db.commit()
            db.refresh(song)
        return song
    
    def delete_song(self, song_id: int) -> bool:
        """Delete a song by its ID."""
        with self.db_session() as db:
            song = db.query(Song).filter(Song.id == song_id).first()
            if not song:
                return False
            
            db.delete(song)
            db.commit()
        return True
    
    def list_songs(self) -> list[Song]:
        """List all songs."""
        with self.db_session() as db:
            songs = db.query(Song).all()
        return songs
