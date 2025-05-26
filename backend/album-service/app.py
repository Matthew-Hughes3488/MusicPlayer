from fastapi import FastAPI
from routers.album_router import router as album_router

app = FastAPI()

app.include_router(album_router)
