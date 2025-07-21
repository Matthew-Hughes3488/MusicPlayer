import pytest
from services.mock_album_service import MockAlbumService
from models.album import Album
from models.album_input import AlbumInput
from datetime import datetime
from errors_exceptions.exceptions import AlbumNotFoundError