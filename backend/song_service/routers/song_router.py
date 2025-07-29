from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.song import Song
from models.song_input import SongInput
from services.song_service import SongService
from repos.song_repository import SongRepository
from services.mock_song_service import MockSongService
from repos.mock_song_repo import MockSongRepository

router = APIRouter()
song_service = MockSongService(song_repository=MockSongRepository())

@router.get("/songs", response_model=List[Song])
async def get_all_songs():
    """
    Get all songs.
    :return: A list of all song objects.
    """
    return song_service.get_all_songs()

@router.get("/songs/{song_id}", response_model=Song)
async def get_song_by_id(song_id: int):
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
async def create_song(song_input: SongInput):
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
async def update_song(song_id: int, song_input: SongInput):
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
async def delete_song(song_id: int):
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