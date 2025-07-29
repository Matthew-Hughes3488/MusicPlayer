from abc import ABC, abstractmethod
from backend.song_service.models.song import Song
from typing import Optional

class SongRepository(ABC):
    @abstractmethod
    def create_song(self, song: Song) -> Song:
        """Create a new song."""
        pass

    @abstractmethod
    def get_song_by_id(self, song_id: int) -> Optional[Song]:
        """Retrieve an song by its ID."""
        pass

    @abstractmethod
    def update_song(self, song: Song) -> Optional[Song]:
        """Update an existing song."""
        pass

    @abstractmethod
    def delete_song(self, song_id: int) -> bool:
        """Delete an song by its ID."""
        pass

    @abstractmethod
    def list_songs(self) -> list[Song]:
        """List all songs."""
        pass

    @abstractmethod
    def get_songs_by_album_id(self, album_id: int) -> list[Song]:
        """Retrieve all songs associated with a specific album ID."""
        pass