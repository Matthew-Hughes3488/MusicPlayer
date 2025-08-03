from backend.album_service.models.album import Album
from datetime import datetime

mock_albums = [
    Album(
        id=1,
        title="Greatest Hits",
        artist="Various Artists",
        genre="Pop",
        description="A collection of the best songs.",
        cover_image_url="https://example.com/covers/greatest_hits.jpg",
        created_at=datetime(2023, 1, 1, 12, 0, 0),
        updated_at=None
    ),
    Album(
        id=2,
        title="Chill Vibes",
        artist="DJ Relax",
        genre="Electronic",
        description="Relaxing and chill tracks.",
        cover_image_url="https://example.com/covers/chill_vibes.jpg",
        created_at=datetime(2023, 2, 15, 15, 30, 0),
        updated_at=datetime(2023, 3, 1, 10, 0, 0)
    ),
    Album(
        id=3,
        title="Rock Anthems",
        artist="The Rockers",
        genre="Rock",
        description="The best of rock music.",
        cover_image_url=None,
        created_at=datetime(2022, 11, 20, 9, 0, 0),
        updated_at=None
    ),
]