from fastapi import FastAPI
from backend.album_service.routers.album_router import router
app = FastAPI()

app.include_router(router)
