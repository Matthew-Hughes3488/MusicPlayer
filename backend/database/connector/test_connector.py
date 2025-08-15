class TestConnector:
    """
    A connector for testing that uses a provided SQLAlchemy sessionmaker (session factory).
    """
    def __init__(self, session_factory):
        """
        session_factory: a SQLAlchemy sessionmaker (e.g., from an in-memory SQLite engine)
        """
        self.session_factory = session_factory

    def get_session(self):
        """
        Returns a new SQLAlchemy session from the test session factory.
        """
        return self.session_factory()