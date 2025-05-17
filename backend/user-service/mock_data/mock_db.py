from models.user_input_model import UserModel
from datetime import datetime

mock_users = [
    UserModel(
        id=1,
        email="alice@example.com",
        password="hashed_alice",
        first_name="Alice",
        last_name="Smith",
        created_at=datetime.utcnow(),
        updated_at=None
    ),
    UserModel(
        id=2,
        email="bob@example.com",
        password="hashed_bob",
        first_name="Bob",
        last_name="Jones",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    ),
    UserModel(
        id=3,
        email="carol@example.com",
        password="hashed_carol",
        first_name="Carol",
        last_name=None,
        created_at=datetime.utcnow(),
        updated_at=None
    ),
]