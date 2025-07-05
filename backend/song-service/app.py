from fastapi import FastAPI
from routers.song_router import router as song_router

app = FastAPI()

app.include_router(song_router)
