from fastapi import FastAPI
from backend.album_service.routers.album_router import router
app = FastAPI(
    title="Album Service",
    description="Service for managing music albums",
    version="1.0.0"
)

app.include_router(router)

@app.get("/health")
def health_check():
    return {"status": "healthy"}
