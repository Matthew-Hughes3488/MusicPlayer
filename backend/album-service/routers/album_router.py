from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.album import Album
from models.album_input import AlbumInput
from services.album_service import AlbumService
from repos.album_repository import AlbumRepository
from services.mock_album_service import MockAlbumService
from repos.mock_album_repo import MockAlbumRepository

router = APIRouter()
album_service = MockAlbumService(album_repository=MockAlbumRepository())

@router.get("/albums", response_model=List[Album])
async def get_all_albums():
    """
    Get all albums.
    :return: A list of all album objects.
    """
    return album_service.get_all_albums()

@router.get("/albums/{album_id}", response_model=Album)
async def get_album_by_id(album_id: int):
    """
    Get an album by its ID.
    :param album_id: The ID of the album to retrieve.
    :return: The album object if found, raises HTTPException otherwise.
    """
    try:
        return album_service.get_album_by_id(album_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
@router.post("/albums", response_model=Album)
async def create_album(album_input: AlbumInput):
    """
    Create a new album.
    :param album_input: The album input object to create.
    :return: The created album object.
    """
    try:
        return album_service.create_new_album(album_input)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.put("/albums/{album_id}", response_model=Album)
async def update_album(album_id: int, album_input: AlbumInput):
    """
    Update an existing album.
    :param album_id: The ID of the album to update.
    :param album_input: The updated album input object.
    :return: The updated album object if successful, raises HTTPException otherwise.
    """
    try:
        return album_service.update_album(album_id, album_input)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.delete("/albums/{album_id}")
async def delete_album(album_id: int):
    """
    Delete an album by its ID.
    :param album_id: The ID of the album to delete.
    :return: A success message if deletion is successful, raises HTTPException otherwise.
    """
    try:
        album_service.delete_album(album_id)
        return {"detail": "Album deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))