from fastapi import FastAPI
from backend.auth_service.routers import router
app = FastAPI(
    title="Auth Service",
    description="Authentication service for MusicPlayer",
    version="1.0.0"
)

app.include_router(router, prefix="/auth")

@app.get("/health")
def health_check():
    return {"status": "healthy"}
