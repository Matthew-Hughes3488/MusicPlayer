from fastapi import FastAPI
from backend.song_service.routers.song_router import router as song_router

app = FastAPI(
    title="Song Service",
    description="Service for managing music songs",
    version="1.0.0"
)

app.include_router(song_router)

@app.get("/health")
def health_check():
    return {"status": "healthy"}
