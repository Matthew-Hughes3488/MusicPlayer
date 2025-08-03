from backend.database.models.song_model import Song as SongModel
from backend.database.models.album_model import Album as AlbumModel
from backend.album_service.models.song import Song
from backend.album_service.models.album import Album
from backend.album_service.models.album_input import AlbumInput

class ModelConverter:
    @staticmethod
    def db_song_to_model(song: SongModel) -> Song:
        return Song(
            id=song.id,
            title=song.title,
            artist=song.artist,
            genre=song.genre,
            file_url=song.file_url,
            duration=song.duration,
            description=song.description,
            cover_image_url=song.cover_image_url,
            release_date=song.release_date,
            created_at=song.created_at,
            updated_at=song.updated_at
        )

    @staticmethod
    def db_album_to_model(album: AlbumModel) -> Album:
        return Album(
            id=album.id,
            title=album.title,
            artist=album.artist,
            genre=album.genre,
            description=album.description,
            cover_image_url=album.cover_image_url,
            created_at=album.created_at,
            updated_at=album.updated_at
        )

    @staticmethod
    def album_input_to_db_model(input: AlbumInput) -> AlbumModel:
        if not all([input.title, input.artist, input.genre, input.created_at]):
            raise ValueError("Missing required album fields")
        return AlbumModel(
            title=input.title,
            artist=input.artist,
            genre=input.genre,
            description=input.description,
            cover_image_url=input.cover_image_url,
            created_at=input.created_at,
            updated_at=input.updated_at
        )