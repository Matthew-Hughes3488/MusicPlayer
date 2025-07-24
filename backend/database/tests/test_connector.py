import pytest
from database.connector.connector import DatabaseConnector

@pytest.fixture
def connector():
    return DatabaseConnector()

def test_database_connection(connector):
    session = connector.get_session()
    assert session is not None
    assert session.bind is not None
    assert session.bind.engine is not None
    assert session.bind.engine.url.database == connector.DB_NAME

    # Clean up the session
    session.close()