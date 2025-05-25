from repos.album_repository import AlbumRepository
from models.album import Album
from typing import Optional, List
from mock_data.mock_albums import mock_albums
from copy import deepcopy


class MockAlbumRepository(AlbumRepository):
    def __init__(self):
        self.albums = {}
        self.next_id = 1
        self.mock_db = deepcopy(mock_albums)

    def create_album(self, album) -> Optional[Album]:
        album.id = self.next_id
        self.mock_db.append(album)
        self.next_id += 1
        return album
    
    def get_album_by_id(self, album_id: int) -> Optional[Album]:
        for album in self.mock_db:
            if album.id == album_id:
                return album
        return None
    
    def update_album(self, album: Album) -> Optional[Album]:
        for i, existing_album in enumerate(self.mock_db):
            if existing_album.id == album.id:
                self.mock_db[i] = album
                return album
        return None
    
    def delete_album(self, album_id: int) -> bool:
        for i, album in enumerate(self.mock_db):
            if album.id == album_id:
                del self.mock_db[i]
                return True
        return False
    
    def list_albums(self) -> List[Album]:
        return self.mock_db.copy()
        