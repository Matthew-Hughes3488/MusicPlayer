from services.album_service import AlbumService
from models.album import Album
from models.album_input import AlbumInput
from typing import Optional, List
from repos.album_repository import AlbumRepository
from errors_exceptions.exceptions import AlbumNotFoundError
from datetime import datetime

class MockAlbumService(AlbumService):
    def __init__(self, album_repository: AlbumRepository):
        self.album_repository = album_repository
        self.id_count = 10

    def get_all_albums(self) -> List[Album]:
        return self.album_repository.list_albums()

    def get_album_by_id(self, id: int) -> Optional[Album]:
         album = self.album_repository.get_album_by_id(id)

         if not album:
             raise AlbumNotFoundError(f"Album with id {id} not found.")
         
         return album

    def create_new_album(self, input: AlbumInput) -> Optional[Album]:
        new_album = Album(id=self.id_count
                          , title =input.title
                          , artist=input.artist
                          , genre=input.genre
                          , description=input.description
                          , cover_image_url=input.cover_image_url
                          , created_at=input.created_at
                          , updated_at=input.updated_at
        )
        self.id_count += 1
        return self.album_repository.create_album(new_album)

    def update_album(self, id: int, album_input: AlbumInput) -> Optional[Album]:
        existing_album = self.album_repository.get_album_by_id(id)

        if not existing_album:
            raise AlbumNotFoundError(f"Album with id {id} not found.")
        
        updated_album = Album(
            id=existing_album.id,
            title=album_input.title if album_input.title else existing_album.title,
            artist=album_input.artist if album_input.artist else existing_album.artist,
            genre=album_input.genre if album_input.genre else existing_album.genre,
            description=album_input.description if album_input.description else existing_album.description,
            cover_image_url=album_input.cover_image_url if album_input.cover_image_url else existing_album.cover_image_url,
            created_at=existing_album.created_at,
            updated_at= datetime.now()
        )

        return self.album_repository.update_album(updated_album)

    def delete_album(self, id: int) -> None:
        if not self.album_repository.get_album_by_id(id):
            raise AlbumNotFoundError(f"Album with id {id} not found.")
        
        self.album_repository.delete_album(id)