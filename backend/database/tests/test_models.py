import pytest
from database.connector.connector import DatabaseConnector
from database.models.user_model import User
from database.models.song_model import Song
from database.models.album_model import Album
from database.models.album_songs_model import album_songs
from database.models.user_likes import user_likes
from sqlalchemy import select
from datetime import datetime

@pytest.fixture(scope="module")
def session(request):
    connector = DatabaseConnector()
    session = connector.get_session()

    # Finalizer for cleanup after all tests
    def cleanup():
        # Remove associations first
        session.execute(album_songs.delete())
        session.execute(user_likes.delete())
        session.query(Album).filter_by(title="Test Album").delete()
        session.query(Song).filter_by(title="Test Song").delete()
        session.query(User).filter_by(username="testuser").delete()
        session.commit()

    request.addfinalizer(cleanup)
    yield session
    session.close()

def test_database_connection(session):
    assert session is not None
    assert session.bind is not None
    assert session.bind.engine is not None

def test_create_user(session):
    user = User(
        username="testuser",
        email="testuser@example.com",
        password_hash="hashedpassword",
        first_name="Test",
        last_name="User",
        created_at=datetime.utcnow(),
    )
    session.add(user)
    session.commit()
    queried_user = session.query(User).filter_by(username="testuser").first()
    assert queried_user is not None
    assert queried_user.email == "testuser@example.com"

def test_create_song(session):
    song = Song(
        title="Test Song",
        artist="Test Artist",
        genre="Rock",
        file_url="http://example.com/test.mp3",
        duration=180,
        description="A test song.",
        created_at=datetime.utcnow(),
    )
    session.add(song)
    session.commit()
    result = session.query(Song).filter_by(title="Test Song").first()
    assert result is not None
    assert result.artist == "Test Artist"

def test_create_album_and_associate_song(session):
    album = Album(
        title="Test Album",
        artist="Test Artist",
        genre="Rock",
        description="A test album.",
        created_at=datetime.utcnow(),
    )
    song = session.query(Song).filter_by(title="Test Song").first()
    session.add(album)
    session.commit()
    # Manual association
    session.execute(album_songs.insert().values(album_id=album.id, song_id=song.id))
    session.commit()
    # Verify association
    result = session.execute(
        select([album_songs]).where(
            album_songs.c.album_id == album.id,
            album_songs.c.song_id == song.id
        )
    ).fetchone()
    assert result is not None

def test_user_likes_song(session):
    user = session.query(User).filter_by(username="testuser").first()
    song = session.query(Song).filter_by(title="Test Song").first()
    session.execute(user_likes.insert().values(user_id=user.id, song_id=song.id))
    session.commit()
    result = session.execute(
        select([user_likes]).where(
            user_likes.c.user_id == user.id,
            user_likes.c.song_id == song.id
        )
    ).fetchone()
    assert result is not None