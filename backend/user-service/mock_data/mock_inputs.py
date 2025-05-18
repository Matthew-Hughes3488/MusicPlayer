from models.user_input_model import UserInputModel

mock_user_inputs = [
    UserInputModel(
        email="alice@example.com",
        password="alicepassword",
        first_name="Alice",
        last_name="Smith"
    ),
    UserInputModel(
        email="bob@example.com",
        password="bobpassword",
        first_name="Bob",
        last_name="Jones"
    ),
    UserInputModel(
        email="carol@example.com",
        password="carolpassword",
        first_name="Carol",
        last_name=None  # intentionally left blank
    ),
]