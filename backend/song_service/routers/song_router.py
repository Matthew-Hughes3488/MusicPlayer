from fastapi import APIRouter, HTTPException, Depends
from typing import List
from backend.song_service.models.song import Song
from backend.song_service.models.song_input import SongInput
from backend.song_service.models.song_update_input import SongUpdateInput
from backend.song_service.repos.song_alchemy_repo import SongAlchemyRepository
from backend.song_service.services.song_alchemy_service import SongAlchemyService
from backend.song_service.utils.auth_helper import auth_helper


router = APIRouter()
song_service = SongAlchemyService(song_repository=SongAlchemyRepository())

@router.get("/songs", response_model=List[Song])
async def get_all_songs(current_user=auth_helper.require_auth()):
    """
    Get all songs.
    :return: A list of all song objects.
    """
    return song_service.get_all_songs()

@router.get("/songs/{song_id}", response_model=Song)
async def get_song_by_id(song_id: int, current_user=auth_helper.require_auth()):
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
async def create_song(song_input: SongInput, current_user=auth_helper.require_role("admin")):
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
async def update_song(song_id: int, song_input: SongUpdateInput, current_user=auth_helper.require_role("admin")):
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
async def delete_song(song_id: int, current_user=auth_helper.require_role("admin")):
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