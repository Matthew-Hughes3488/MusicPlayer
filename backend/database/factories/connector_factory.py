from backend.database.connector.connector import DatabaseConnector as ProdDatabaseConnector
from backend.database.connector.test_connector import TestConnector


class DatabaseConnectorFactory:
    """
    Factory class to create database connectors for different environments.
    """
    
    @staticmethod
    def create_connector(connector_type="prod", session_factory=None):
        """
        Create a database connector based on the specified type.
        
        Args:
            connector_type (str): Type of connector ('prod' or 'test').
            session_factory: Optional session factory for test connectors.
        
        Returns:
            DatabaseConnector or TestConnector: An instance of the appropriate connector.
        """
        if connector_type == "test":
            if session_factory is None:
                raise ValueError("session_factory is required when connector_type is 'test'")
            return TestConnector(session_factory)
        elif connector_type == "prod":
            return ProdDatabaseConnector()
        else:
            raise ValueError(f"Unknown connector_type: {connector_type}. Use 'prod' or 'test'.")