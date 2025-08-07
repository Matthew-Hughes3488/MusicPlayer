from fastapi import APIRouter, HTTPException, Depends, Request, status
from backend.album_service.utils.jwt_utils import verify_access_token   
from typing import List
from backend.album_service.models.album import Album
from backend.album_service.models.album_input import AlbumInput
from backend.album_service.models.album_update_input import AlbumUpdateInput
from backend.album_service.repos.album_alchemy_repo import AlbumAlchemyRepository
from backend.album_service.services.album_alchemy_service import AlbumAlchemyService
from backend.album_service.models.song import Song

router = APIRouter()
album_service = AlbumAlchemyService(album_repository=AlbumAlchemyRepository())

def authorize_request(request: Request, required_role: str = None):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing or invalid Authorization header")
    token = auth_header.split(" ")[1]
    try:
        payload = verify_access_token(token)
        if required_role and payload.get("role") != required_role:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
        return payload
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

@router.get("/albums", response_model=List[Album])
async def get_all_albums(current_user=Depends(authorize_request)):
    """
    Get all albums.
    :return: A list of all album objects.
    """
    return album_service.get_all_albums()

@router.get("/albums/{album_id}", response_model=Album)
async def get_album_by_id(album_id: int, current_user=Depends(authorize_request)):
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
async def create_album(album_input: AlbumInput, current_user=Depends(authorize_request("admin"))):
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
async def update_album(album_id: int, album_input: AlbumUpdateInput, current_user=Depends(authorize_request("admin"))):
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
async def delete_album(album_id: int, current_user=Depends(authorize_request("admin"))):
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

@router.get("/albums/{album_id}/songs", response_model=List[Song])
async def get_album_songs(album_id: int, current_user=Depends(authorize_request)):
    """
    Get all songs in an album.
    :param album_id: The ID of the album to retrieve songs from.
    :return: A list of song titles in the album.
    """
    try:
        return album_service.get_album_songs(album_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))