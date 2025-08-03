from abc import ABC, abstractmethod
from typing import List, Optional
from backend.song_service.models.song import Song
from backend.song_service.models.song_input import SongInput
from backend.song_service.models.song_update_input import SongUpdateInput
from backend.song_service.repos.abstract_alchemy_song_repo import AbstractAlchemySongRepo

class AbstractSongAlchemyService(ABC):
    def __init__(self, song_repository: AbstractAlchemySongRepo):
        self.song_repository = song_repository

    @abstractmethod
    def get_all_songs(self) -> List[Song]:
        """Retrieve all songs."""
        pass

    @abstractmethod
    def get_song_by_id(self, id: int) -> Optional[Song]:
        """Retrieve a song by its ID."""
        pass

    @abstractmethod
    def create_new_song(self, input: SongInput) -> Optional[Song]:
        """Create a new song."""
        pass

    @abstractmethod
    def update_song(self, id: int, song_input: SongUpdateInput) -> Optional[Song]:
        """Update an existing song."""
        pass

    @abstractmethod
    def delete_song(self, id: int) -> bool:
        """Delete a song by its ID."""
        pass