from backend.album_service.services.abstract_album_alchemy_service import AbstractAlbumAlchemyService
from typing import List, Optional
from backend.album_service.models.album import Album
from backend.album_service.models.album_input import AlbumInput
from backend.database.models.album_model import Album as AlbumModel
from backend.album_service.models.song import Song
from backend.album_service.errors_exceptions.exceptions import AlbumNotFoundError
from backend.album_service.utils.model_to_model_functions import ModelConverter

class AlbumAlchemyService(AbstractAlbumAlchemyService):
    def __init__(self, album_repository):
        super().__init__(album_repository)
        self.model_converter = ModelConverter()
    
    def get_all_albums(self) -> List[Album]:
        albums = self.album_repository.list_albums()
        return [self.model_converter.db_album_to_model(album) for album in albums]
    
    def get_album_by_id(self, id: int) -> Optional[Album]:
        album = self.album_repository.get_album_by_id(id)
        if not album:
            raise AlbumNotFoundError(f"Album with id {id} not found.")
        return self.model_converter.db_album_to_model(album)
    
    def create_new_album(self, input: AlbumInput) -> Optional[Album]:
        created_album = self.album_repository.create_album(self.album_input_to_db_model(input))
        return self.model_converter.db_album_to_model(created_album) if created_album else None
    
    def update_album(self, id: int, album_input: AlbumInput) -> Optional[Album]:
        existing_album = self.album_repository.get_album_by_id(id)
        if not existing_album:
            raise AlbumNotFoundError(f"Album with id {id} not found.")
        
        updated_album = AlbumModel(
            id=existing_album.id,
            title=album_input.title if album_input.title else existing_album.title,
            artist=album_input.artist if album_input.artist else existing_album.artist,
            genre=album_input.genre if album_input.genre else existing_album.genre,
            description=album_input.description if album_input.description else existing_album.description,
            cover_image_url=album_input.cover_image_url if album_input.cover_image_url else existing_album.cover_image_url,
            created_at=existing_album.created_at,
            updated_at=existing_album.updated_at
        )
        
        updated_album = self.album_repository.update_album(updated_album)
        return self.model_converter.db_album_to_model(updated_album) if updated_album else None
    
    def delete_album(self, id: int) -> bool:
        if not self.album_repository.get_album_by_id(id):
            return False
        self.album_repository.delete_album(id)
        return True
    
    def get_album_songs(self, album_id: int) -> List[Song]:
        songs = self.album_repository.get_songs_by_album_id(album_id)
        if not songs:
            raise AlbumNotFoundError(f"No Songs found for Album with id {album_id} not found.")
        return songs
