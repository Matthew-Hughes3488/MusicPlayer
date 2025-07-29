from fastapi import FastAPI
from backend.song_service.routers.song_router import router as song_router

app = FastAPI()

app.include_router(song_router)
