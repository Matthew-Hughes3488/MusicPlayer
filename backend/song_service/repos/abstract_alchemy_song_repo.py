from abc import ABC, abstractmethod
from typing import List, Optional
from backend.database.models.song_model import Song
from backend.song_service.models.song_update_input import SongUpdateInput 


class AbstractAlchemySongRepo(ABC):
    @abstractmethod
    def create_song(self, song : Song) -> Optional[Song]:
        """Create a new song."""
        pass

    @abstractmethod
    def get_song_by_id(self, song_id: int) -> Optional[Song]:
        """Retrieve a song by its ID."""
        pass

    @abstractmethod
    def update_song(self, song_id: id, song: SongUpdateInput) -> Optional[Song]:
        """Update an existing song."""
        pass

    @abstractmethod
    def delete_song(self, song_id: int) -> bool:
        """Delete a song by its ID."""
        pass

    @abstractmethod
    def list_songs(self) -> List[Song]:
        """List all songs."""
        pass