from fastapi import FastAPI
from backend.auth_service.routers import router
app = FastAPI()

app.include_router(router)