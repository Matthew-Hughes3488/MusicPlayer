from fastapi import FastAPI
from backend.user_service.routers.user_router import router as user_router

app = FastAPI()

app.include_router(user_router)
