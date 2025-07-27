from abc import ABC, abstractmethod
from typing import List, Optional
from backend.album_service.models.album import Album
from backend.album_service.models.album_input import AlbumInput
from backend.album_service.repos.abstract_album_alchemy_repo import AbstractAlbumAlchemyRepository

class AbstractAlbumAlchemyService(ABC):
    def __init__(self, album_repository: AbstractAlbumAlchemyRepository):
        self.album_repository = album_repository

    @abstractmethod
    def get_all_albums(self) -> List[Album]:
        """Get all albums."""
        pass

    @abstractmethod
    def get_album_by_id(self, id: int) -> Optional[Album]:
        """Get an album by its ID."""
        pass

    @abstractmethod
    def create_new_album(self, input: AlbumInput) -> Optional[Album]:
        """Create a new album."""
        pass

    @abstractmethod
    def update_album(self, id: int, album_input: AlbumInput) -> Optional[Album]:
        """Update an existing album."""
        pass

    @abstractmethod
    def delete_album(self, id: int) -> None:
        """Delete an album by its ID."""
        pass

    @abstractmethod
    def get_album_songs(self, album_id: int) -> List[str]:
        """Get all songs in an album."""
        pass