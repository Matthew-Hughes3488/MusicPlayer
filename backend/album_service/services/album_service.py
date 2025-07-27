from backend.album_service.repos.album_repository import AlbumRepository
from backend.album_service.models.album import Album
from backend.album_service.models.album_input import AlbumInput
from typing import Optional, List
from abc import ABC, abstractmethod  

class AlbumService(ABC):
    @abstractmethod
    def get_all_albums(self) -> List[Album]:
        """
        Get all albums.
        :return: A list of all album objects.
        """
        pass

    @abstractmethod
    def get_album_by_id(self, id: int) -> Optional[Album]:
        """
        Get an album by its ID.
        :param id: The ID of the album to retrieve.
        :return: The album object if found, None otherwise.
        """
        pass

    @abstractmethod
    def create_new_album(self, input: AlbumInput) -> Optional[Album]:
        """
        Create a new album.
        :param input: The album input object to create.
        :return: The created album object.
        """
        pass

    @abstractmethod
    def update_album(self, id: int, album_input: AlbumInput) -> Optional[Album]:
        """
        Update an existing album.
        :param id: The ID of the album to update.
        :param album_input: The updated album input object.
        :return: The updated album object if successful, None otherwise.
        """
        pass

    @abstractmethod
    def delete_album(self, id: int) -> bool:
        """
        Delete an album by its ID.
        :param id: The ID of the album to delete.
        :return: None
        """
        pass
