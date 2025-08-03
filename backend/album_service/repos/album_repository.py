from abc import ABC, abstractmethod
from backend.album_service.models.album import Album
from typing import Optional

class AlbumRepository(ABC):
    @abstractmethod
    def create_album(self, album: Album) -> Album:
        """Create a new album."""
        pass

    @abstractmethod
    def get_album_by_id(self, album_id: int) -> Optional[Album]:
        """Retrieve an album by its ID."""
        pass

    @abstractmethod
    def update_album(self, album: Album) -> Optional[Album]:
        """Update an existing album."""
        pass

    @abstractmethod
    def delete_album(self, album_id: int) -> bool:
        """Delete an album by its ID."""
        pass

    @abstractmethod
    def list_albums(self) -> list[Album]:
        """List all albums."""
        pass