from models.song import Song
from datetime import datetime

mock_songs = [
    Song(
        id=1,
        title="Song One",
        artist="Artist A",
        genre="Pop",
        file_url="http://example.com/song1.mp3",
        duration=240,
        description="A catchy pop song.",
        cover_image_url="http://example.com/song1.jpg",
        release_date=datetime(2022, 1, 1),
        created_at=datetime(2022, 1, 1),
        updated_at=None
    ),
    Song(
        id=2,
        title="Song Two",
        artist="Artist B",
        genre="Rock",
        file_url="http://example.com/song2.mp3",
        duration=300,
        description="An energetic rock anthem.",
        cover_image_url="http://example.com/song2.jpg",
        release_date=datetime(2022, 2, 1),
        created_at=datetime(2022, 2, 1),
        updated_at=None
    ),
    Song(
        id=3,
        title="Song Three",
        artist="Artist C",
        genre="Jazz",
        file_url="http://example.com/song3.mp3",
        duration=180,
        description="A smooth jazz tune.",
        cover_image_url="http://example.com/song3.jpg",
        release_date=datetime(2022, 3, 1),
        created_at=datetime(2022, 3, 1),
        updated_at=None
    ),
    Song(
        id=4,
        title="Song Four",
        artist="Artist D",
        genre="Classical",
        file_url="http://example.com/song4.mp3",
        duration=360,
        description="A beautiful classical piece.",
        cover_image_url="http://example.com/song4.jpg",
        release_date=datetime(2022, 4, 1),
        created_at=datetime(2022, 4, 1),
        updated_at=None
    )
]