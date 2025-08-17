from fastapi import FastAPI
from backend.user_service.routers.user_router import router as user_router

app = FastAPI(
    title="User Service",
    description="Service for managing user accounts",
    version="1.0.0"
)

app.include_router(user_router)

@app.get("/health")
def health_check():
    return {"status": "healthy"}
