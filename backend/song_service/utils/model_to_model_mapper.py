from backend.song_service.models.song import Song
from backend.song_service.models.song_input import SongInput
from backend.song_service.models.song_update_input import SongUpdateInput
from backend.database.models.song_model import Song as SongModel

class ModelToModelMapper():
    @staticmethod
    def song_input_to_db_model(song_input: SongInput) -> SongModel:
        """Convert SongInput to SongModel."""
        if not all([song_input.title, song_input.artist, song_input.genre, song_input.file_url]):
            raise ValueError("Missing required song fields")
        
        return SongModel(
            title=song_input.title,
            artist=song_input.artist,
            genre=song_input.genre,
            file_url=song_input.file_url,
            duration=song_input.duration,
            description=song_input.description,
            cover_image_url=song_input.cover_image_url,
            created_at=song_input.created_at,
            release_date=song_input.release_date
        )
    

    @staticmethod
    def db_song_to_model(song: SongModel) -> Song:
        """Convert SongModel to Song."""
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