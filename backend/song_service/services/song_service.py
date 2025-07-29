from repos.song_repository import SongRepository
from models.song import Song
from models.song_input import SongInput
from typing import Optional, List
from abc import ABC, abstractmethod  

class SongService(ABC):
    @abstractmethod
    def get_all_songs(self) -> List[Song]:
        """
        Get all songs.
        :return: A list of all song objects.
        """
        pass

    @abstractmethod
    def get_song_by_id(self, id: int) -> Optional[Song]:
        """
        Get an song by its ID.
        :param id: The ID of the song to retrieve.
        :return: The song object if found, None otherwise.
        """
        pass

    @abstractmethod
    def create_new_song(self, input: SongInput) -> Optional[Song]:
        """
        Create a new song.
        :param input: The song input object to create.
        :return: The created song object.
        """
        pass

    @abstractmethod
    def update_song(self, id: int, song_input: SongInput) -> Optional[Song]:
        """
        Update an existing song.
        :param id: The ID of the song to update.
        :param song_input: The updated song input object.
        :return: The updated song object if successful, None otherwise.
        """
        pass

    @abstractmethod
    def delete_song(self, id: int) -> None:
        """
        Delete an song by its ID.
        :param id: The ID of the song to delete.
        :return: None
        """
        pass
