from backend.song_service.services.song_service import SongService
from backend.song_service.models.song import Song
from backend.song_service.models.song_input import SongInput
from typing import Optional, List
from backend.song_service.repos.song_repository import SongRepository
from backend.song_service.errors_exceptions.exceptions import SongNotFoundError
from datetime import datetime

class MockSongService(SongService):
    def __init__(self, song_repository: SongRepository):
        self.song_repository = song_repository
        self.id_count = 10

    def get_all_songs(self) -> List[Song]:
        return self.song_repository.list_songs()

    def get_song_by_id(self, id: int) -> Optional[Song]:
         song = self.song_repository.get_song_by_id(id)

         if not song:
             raise SongNotFoundError(f"Song with id {id} not found.")
         
         return song

    def create_new_song(self, input: SongInput) -> Optional[Song]:
        new_song = Song(
            id=self.id_count,
            title=input.title,
            artist=input.artist,
            genre=input.genre,
            file_url=input.file_url,
            duration=input.duration,
            description=input.description,
            cover_image_url=input.cover_image_url,
            release_date=input.release_date,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        self.id_count += 1
        return self.song_repository.create_song(new_song)

    def update_song(self, id: int, song_input: SongInput) -> Optional[Song]:
        existing_song = self.song_repository.get_song_by_id(id)

        if not existing_song:
            raise SongNotFoundError(f"Song with id {id} not found.")
        
        updated_song = Song(
            id=existing_song.id,
            title=song_input.title if song_input.title else existing_song.title,
            artist=song_input.artist if song_input.artist else existing_song.artist,
            genre=song_input.genre if song_input.genre else existing_song.genre,
            file_url=song_input.file_url if song_input.file_url else existing_song.file_url,
            duration=song_input.duration if song_input.duration else existing_song.duration,
            release_date=song_input.release_date if song_input.release_date else existing_song.release_date,
            description=song_input.description if song_input.description else existing_song.description,
            cover_image_url=song_input.cover_image_url if song_input.cover_image_url else existing_song.cover_image_url,
            created_at=existing_song.created_at,
            updated_at= datetime.now()
        )

        return self.song_repository.update_song(updated_song)

    def delete_song(self, id: int) -> None:
        if not self.song_repository.get_song_by_id(id):
            raise SongNotFoundError(f"Song with id {id} not found.")
        
        self.song_repository.delete_song(id)