from backend.song_service.models.song import Song
from backend.song_service.models.song_input import SongInput
from backend.song_service.models.song_update_input import SongUpdateInput
from backend.song_service.errors_exceptions.exceptions import SongNotFoundError
from backend.song_service.repos.abstract_alchemy_song_repo import AbstractAlchemySongRepo
from backend.song_service.services.abstract_song_alchemy_service import AbstractSongAlchemyService
from backend.song_service.utils.model_to_model_mapper import ModelToModelMapper

class SongAlchemyService(AbstractSongAlchemyService):
    def __init__(self, song_repository: AbstractAlchemySongRepo):
        self.song_repository = song_repository
        self.model_mapper = ModelToModelMapper()

    def get_all_songs(self) -> list[Song]:
        """Retrieve all songs."""
        songs = self.song_repository.list_songs()
        return [self.model_mapper.db_song_to_model(song) for song in songs]
    
    def get_song_by_id(self, id: int) -> Song:
        """Retrieve a song by its ID."""
        song = self.song_repository.get_song_by_id(id)
        if not song:
            raise SongNotFoundError(f"Song with id {id} not found.")
        return self.model_mapper.db_song_to_model(song)
    
    def create_new_song(self, input: SongInput) -> Song:
        """Create a new song."""
        created_song = self.song_repository.create_song(self.model_mapper.song_input_to_db_model(input))
        return self.model_mapper.db_song_to_model(created_song) if created_song else None
    
    def update_song(self, id: int, song_input: SongUpdateInput) -> Song:
        """Update an existing song."""
        updated_song = self.song_repository.update_song(id, song_input)
        if not updated_song:
            raise SongNotFoundError(f"Song with id {id} not found.")
        return self.model_mapper.db_song_to_model(updated_song) if updated_song else None
    
    def delete_song(self, id: int) -> bool:
        """Delete a song by its ID."""
        if not self.song_repository.get_song_by_id(id):
            return False
        self.song_repository.delete_song(id)
        return True