from fastapi import APIRouter, HTTPException, Depends, Request, status
from backend.song_service.utils.jwt_utils import verify_access_token
from typing import List
from backend.song_service.models.song import Song
from backend.song_service.models.song_input import SongInput
from backend.song_service.models.song_update_input import SongUpdateInput
from backend.song_service.repos.song_alchemy_repo import SongAlchemyRepository
from backend.song_service.services.song_alchemy_service import SongAlchemyService


router = APIRouter()
song_service = SongAlchemyService(song_repository=SongAlchemyRepository())

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

@router.get("/songs", response_model=List[Song])
async def get_all_songs(current_user=Depends(authorize_request)):
    """
    Get all songs.
    :return: A list of all song objects.
    """
    return song_service.get_all_songs()

@router.get("/songs/{song_id}", response_model=Song)
async def get_song_by_id(song_id: int, current_user=Depends(authorize_request)):
    """
    Get an song by its ID.
    :param song_id: The ID of the song to retrieve.
    :return: The song object if found, raises HTTPException otherwise.
    """
    try:
        return song_service.get_song_by_id(song_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
@router.post("/songs", response_model=Song)
async def create_song(song_input: SongInput, current_user=Depends(authorize_request("admin"))):
    """
    Create a new song.
    :param song_input: The song input object to create.
    :return: The created song object.
    """
    try:
        return song_service.create_new_song(song_input)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.put("/songs/{song_id}", response_model=Song)
async def update_song(song_id: int, song_input: SongUpdateInput, current_user=Depends(authorize_request("admin"))):
    """
    Update an existing song.
    :param song_id: The ID of the song to update.
    :param song_input: The updated song input object.
    :return: The updated song object if successful, raises HTTPException otherwise.
    """
    try:
        return song_service.update_song(song_id, song_input)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.delete("/songs/{song_id}")
async def delete_song(song_id: int, current_user=Depends(authorize_request("admin"))):
    """
    Delete an song by its ID.
    :param song_id: The ID of the song to delete.
    :return: A success message if deletion is successful, raises HTTPException otherwise.
    """
    try:
        song_service.delete_song(song_id)
        return {"detail": "Song deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))