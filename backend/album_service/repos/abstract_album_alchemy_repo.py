from abc import ABC, abstractmethod
from typing import List, Optional
from backend.database.models.album_model import Album
from backend.album_service.models.album_update_input import AlbumUpdateInput

class AbstractAlbumAlchemyRepository(ABC):
    @abstractmethod
    def create_album(self, album: Album) -> Album:
        """Create a new album."""
        pass

    @abstractmethod
    def get_album_by_id(self, album_id: int) -> Optional[Album]:
        """Retrieve an album by its ID."""
        pass

    @abstractmethod
    def update_album(self, album_id: int, album: AlbumUpdateInput) -> Album:
        """Update an existing album."""
        pass

    @abstractmethod
    def delete_album(self, album_id: int) -> bool:
        """Delete an album by its ID."""
        pass

    @abstractmethod
    def list_albums(self) -> List[Album]:
        """List all albums."""
        pass

    @abstractmethod
    def get_songs_by_album_id(self, album_id: int) -> List[Album]:
        """Retrieve all songs associated with a specific album."""
        pass
