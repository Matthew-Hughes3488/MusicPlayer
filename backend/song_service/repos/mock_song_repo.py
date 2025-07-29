from backend.song_service.repos.song_repository import SongRepository
from backend.song_service.models.song import Song
from backend.song_service.typing import Optional, List
from backend.song_service.mock_data.mock_songs import mock_songs
from copy import deepcopy

class MockSongRepository(SongRepository):
    def __init__(self):
        self.songs = {}
        self.mock_db = deepcopy(mock_songs)

    def create_song(self, song) -> Optional[Song]:
        self.mock_db.append(song)
        return song
    
    def get_song_by_id(self, song_id: int) -> Optional[Song]:
        for song in self.mock_db:
            if song.id == song_id:
                return song
        return None
    
    def update_song(self, song: Song) -> Optional[Song]:
        for i, existing_song in enumerate(self.mock_db):
            if existing_song.id == song.id:
                self.mock_db[i] = song
                return song
        return None
    
    def delete_song(self, song_id: int) -> bool:
        for i, song in enumerate(self.mock_db):
            if song.id == song_id:
                del self.mock_db[i]
                return True
        return False
    
    def list_songs(self) -> List[Song]:
        return self.mock_db.copy()
    
    # TODO: implement get_songs_by_album_id
    def get_songs_by_album_id(self, album_id: int) -> List[Song]:
        pass
    
    
        