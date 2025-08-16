"""
Mock Test Data for Album Service API Tests

This file contains realistic mock data for testing the Album Service API.
All data is in SQLAlchemy model format for direct insertion into test databases.

Usage:
    from backend.album_service.tests.mock_test_data import MOCK_ALBUMS, MOCK_SONGS
    
    # In your test setup
    db_session.add_all(MOCK_ALBUMS)
    db_session.add_all(MOCK_SONGS) 
    db_session.commit()
"""

from datetime import datetime
from backend.database.models.album_model import Album as AlbumModel
from backend.database.models.song_model import Song as SongModel

# =============================================================================
# MOCK ALBUMS - Realistic album data across different genres
# =============================================================================

MOCK_ALBUMS = [
    # Classic Rock Album
    AlbumModel(
        id=1,
        title="The Dark Side of the Moon",
        artist="Pink Floyd",
        genre="Progressive Rock",
        description="A legendary concept album exploring themes of conflict, greed, time, death, and mental illness.",
        cover_image_url="https://example.com/covers/dark_side_moon.jpg",
        created_at=datetime(2023, 1, 15, 10, 0, 0),
        updated_at=datetime(2023, 1, 15, 10, 0, 0)
    ),
    
    # Pop Album
    AlbumModel(
        id=2,
        title="Thriller",
        artist="Michael Jackson",
        genre="Pop",
        description="The best-selling album of all time, featuring iconic hits and groundbreaking music videos.",
        cover_image_url="https://example.com/covers/thriller.jpg",
        created_at=datetime(2023, 2, 10, 14, 30, 0),
        updated_at=datetime(2023, 2, 10, 14, 30, 0)
    ),
    
    # Hip-Hop Album
    AlbumModel(
        id=3,
        title="good kid, m.A.A.d city",
        artist="Kendrick Lamar",
        genre="Hip-Hop",
        description="A cinematic tale of Lamar's adolescence in gang-ridden Compton, California.",
        cover_image_url="https://example.com/covers/good_kid_maad_city.jpg",
        created_at=datetime(2023, 3, 5, 9, 15, 0),
        updated_at=datetime(2023, 3, 5, 9, 15, 0)
    ),
    
    # Jazz Album
    AlbumModel(
        id=4,
        title="Kind of Blue",
        artist="Miles Davis",
        genre="Jazz",
        description="A seminal jazz album that pioneered modal jazz and influenced countless musicians.",
        cover_image_url="https://example.com/covers/kind_of_blue.jpg",
        created_at=datetime(2023, 4, 20, 16, 45, 0),
        updated_at=datetime(2023, 4, 20, 16, 45, 0)
    ),
    
    # Electronic Album
    AlbumModel(
        id=5,
        title="Random Access Memories",
        artist="Daft Punk",
        genre="Electronic",
        description="A tribute to late 1970s and early 1980s American music, featuring live instrumentation.",
        cover_image_url="https://example.com/covers/random_access_memories.jpg",
        created_at=datetime(2023, 5, 12, 11, 20, 0),
        updated_at=datetime(2023, 5, 12, 11, 20, 0)
    ),
    
    # Alternative Rock Album
    AlbumModel(
        id=6,
        title="OK Computer",
        artist="Radiohead",
        genre="Alternative Rock",
        description="A dystopian masterpiece exploring themes of modern alienation and technology.",
        cover_image_url="https://example.com/covers/ok_computer.jpg",
        created_at=datetime(2023, 6, 8, 13, 10, 0),
        updated_at=datetime(2023, 6, 8, 13, 10, 0)
    ),
    
    # R&B Album
    AlbumModel(
        id=7,
        title="Songs in the Key of Life",
        artist="Stevie Wonder",
        genre="R&B",
        description="A double album showcasing Wonder's musical genius and social consciousness.",
        cover_image_url="https://example.com/covers/songs_key_life.jpg",
        created_at=datetime(2023, 7, 25, 15, 35, 0),
        updated_at=datetime(2023, 7, 25, 15, 35, 0)
    ),
    
    # Indie Folk Album
    AlbumModel(
        id=8,
        title="For Emma, Forever Ago",
        artist="Bon Iver",
        genre="Indie Folk",
        description="Intimate and haunting songs recorded in a remote Wisconsin cabin during winter isolation.",
        cover_image_url="https://example.com/covers/for_emma.jpg",
        created_at=datetime(2023, 8, 14, 12, 25, 0),
        updated_at=datetime(2023, 8, 14, 12, 25, 0)
    ),
]

# =============================================================================
# MOCK SONGS - Realistic song data for each album
# =============================================================================

MOCK_SONGS = [
    # Songs for "The Dark Side of the Moon" (Album ID: 1)
    SongModel(
        id=1,
        title="Speak to Me",
        artist="Pink Floyd",
        genre="Progressive Rock",
        file_url="/songs/pink_floyd/speak_to_me.mp3",
        duration=90,  # 1:30
        description="Opening instrumental track with heartbeat and sound effects.",
        cover_image_url="https://example.com/covers/dark_side_moon.jpg",
        release_date=datetime(1973, 3, 1),
        created_at=datetime(2023, 1, 15, 10, 0, 0),
        updated_at=datetime(2023, 1, 15, 10, 0, 0)
    ),
    SongModel(
        id=2,
        title="Money",
        artist="Pink Floyd",
        genre="Progressive Rock",
        file_url="/songs/pink_floyd/money.mp3",
        duration=383,  # 6:23
        description="Famous for its distinctive 7/4 time signature and cash register sound effects.",
        cover_image_url="https://example.com/covers/dark_side_moon.jpg",
        release_date=datetime(1973, 3, 1),
        created_at=datetime(2023, 1, 15, 10, 0, 0),
        updated_at=datetime(2023, 1, 15, 10, 0, 0)
    ),
    SongModel(
        id=3,
        title="Time",
        artist="Pink Floyd",
        genre="Progressive Rock",
        file_url="/songs/pink_floyd/time.mp3",
        duration=413,  # 6:53
        description="Features the famous ticking clocks intro and explores themes of time and mortality.",
        cover_image_url="https://example.com/covers/dark_side_moon.jpg",
        release_date=datetime(1973, 3, 1),
        created_at=datetime(2023, 1, 15, 10, 0, 0),
        updated_at=datetime(2023, 1, 15, 10, 0, 0)
    ),
    
    # Songs for "Thriller" (Album ID: 2)
    SongModel(
        id=4,
        title="Billie Jean",
        artist="Michael Jackson",
        genre="Pop",
        file_url="/songs/michael_jackson/billie_jean.mp3",
        duration=294,  # 4:54
        description="Jackson's signature song with an unforgettable bassline and iconic music video.",
        cover_image_url="https://example.com/covers/thriller.jpg",
        release_date=datetime(1982, 11, 30),
        created_at=datetime(2023, 2, 10, 14, 30, 0),
        updated_at=datetime(2023, 2, 10, 14, 30, 0)
    ),
    SongModel(
        id=5,
        title="Beat It",
        artist="Michael Jackson",
        genre="Pop",
        file_url="/songs/michael_jackson/beat_it.mp3",
        duration=258,  # 4:18
        description="Rock-influenced pop song featuring an iconic guitar solo by Eddie Van Halen.",
        cover_image_url="https://example.com/covers/thriller.jpg",
        release_date=datetime(1982, 11, 30),
        created_at=datetime(2023, 2, 10, 14, 30, 0),
        updated_at=datetime(2023, 2, 10, 14, 30, 0)
    ),
    SongModel(
        id=6,
        title="Thriller",
        artist="Michael Jackson",
        genre="Pop",
        file_url="/songs/michael_jackson/thriller.mp3",
        duration=357,  # 5:57
        description="The title track with its horror-themed music video and Vincent Price's spoken word segment.",
        cover_image_url="https://example.com/covers/thriller.jpg",
        release_date=datetime(1982, 11, 30),
        created_at=datetime(2023, 2, 10, 14, 30, 0),
        updated_at=datetime(2023, 2, 10, 14, 30, 0)
    ),
    
    # Songs for "good kid, m.A.A.d city" (Album ID: 3)
    SongModel(
        id=7,
        title="Swimming Pools (Drank)",
        artist="Kendrick Lamar",
        genre="Hip-Hop",
        file_url="/songs/kendrick_lamar/swimming_pools.mp3",
        duration=316,  # 5:16
        description="A introspective track about peer pressure and alcohol abuse with multiple vocal personas.",
        cover_image_url="https://example.com/covers/good_kid_maad_city.jpg",
        release_date=datetime(2012, 10, 22),
        created_at=datetime(2023, 3, 5, 9, 15, 0),
        updated_at=datetime(2023, 3, 5, 9, 15, 0)
    ),
    SongModel(
        id=8,
        title="Poetic Justice",
        artist="Kendrick Lamar",
        genre="Hip-Hop",
        file_url="/songs/kendrick_lamar/poetic_justice.mp3",
        duration=301,  # 5:01
        description="Featuring Drake, this track samples Janet Jackson's 'Any Time, Any Place'.",
        cover_image_url="https://example.com/covers/good_kid_maad_city.jpg",
        release_date=datetime(2012, 10, 22),
        created_at=datetime(2023, 3, 5, 9, 15, 0),
        updated_at=datetime(2023, 3, 5, 9, 15, 0)
    ),
    
    # Songs for "Kind of Blue" (Album ID: 4)
    SongModel(
        id=9,
        title="So What",
        artist="Miles Davis",
        genre="Jazz",
        file_url="/songs/miles_davis/so_what.mp3",
        duration=540,  # 9:00
        description="The opening track showcasing modal jazz composition and improvisation.",
        cover_image_url="https://example.com/covers/kind_of_blue.jpg",
        release_date=datetime(1959, 8, 17),
        created_at=datetime(2023, 4, 20, 16, 45, 0),
        updated_at=datetime(2023, 4, 20, 16, 45, 0)
    ),
    SongModel(
        id=10,
        title="All Blues",
        artist="Miles Davis",
        genre="Jazz",
        file_url="/songs/miles_davis/all_blues.mp3",
        duration=690,  # 11:30
        description="A blues composition in 6/8 time featuring memorable solos by the entire sextet.",
        cover_image_url="https://example.com/covers/kind_of_blue.jpg",
        release_date=datetime(1959, 8, 17),
        created_at=datetime(2023, 4, 20, 16, 45, 0),
        updated_at=datetime(2023, 4, 20, 16, 45, 0)
    ),
    
    # Songs for "Random Access Memories" (Album ID: 5)
    SongModel(
        id=11,
        title="Get Lucky",
        artist="Daft Punk",
        genre="Electronic",
        file_url="/songs/daft_punk/get_lucky.mp3",
        duration=367,  # 6:07
        description="Featuring Pharrell Williams and Nile Rodgers, this disco-funk track became a global hit.",
        cover_image_url="https://example.com/covers/random_access_memories.jpg",
        release_date=datetime(2013, 5, 21),
        created_at=datetime(2023, 5, 12, 11, 20, 0),
        updated_at=datetime(2023, 5, 12, 11, 20, 0)
    ),
    SongModel(
        id=12,
        title="Lose Yourself to Dance",
        artist="Daft Punk",
        genre="Electronic",
        file_url="/songs/daft_punk/lose_yourself_to_dance.mp3",
        duration=354,  # 5:54
        description="Another collaboration with Pharrell Williams featuring live bass and guitar.",
        cover_image_url="https://example.com/covers/random_access_memories.jpg",
        release_date=datetime(2013, 5, 21),
        created_at=datetime(2023, 5, 12, 11, 20, 0),
        updated_at=datetime(2023, 5, 12, 11, 20, 0)
    ),
    
    # Songs for "OK Computer" (Album ID: 6)
    SongModel(
        id=13,
        title="Paranoid Android",
        artist="Radiohead",
        genre="Alternative Rock",
        file_url="/songs/radiohead/paranoid_android.mp3",
        duration=383,  # 6:23
        description="A multi-part epic exploring themes of alienation and technology anxiety.",
        cover_image_url="https://example.com/covers/ok_computer.jpg",
        release_date=datetime(1997, 6, 16),
        created_at=datetime(2023, 6, 8, 13, 10, 0),
        updated_at=datetime(2023, 6, 8, 13, 10, 0)
    ),
    SongModel(
        id=14,
        title="Karma Police",
        artist="Radiohead",
        genre="Alternative Rock",
        file_url="/songs/radiohead/karma_police.mp3",
        duration=261,  # 4:21
        description="One of Radiohead's most accessible songs with cryptic lyrics and memorable piano.",
        cover_image_url="https://example.com/covers/ok_computer.jpg",
        release_date=datetime(1997, 6, 16),
        created_at=datetime(2023, 6, 8, 13, 10, 0),
        updated_at=datetime(2023, 6, 8, 13, 10, 0)
    ),
    
    # Songs for "Songs in the Key of Life" (Album ID: 7)
    SongModel(
        id=15,
        title="Sir Duke",
        artist="Stevie Wonder",
        genre="R&B",
        file_url="/songs/stevie_wonder/sir_duke.mp3",
        duration=234,  # 3:54
        description="A tribute to Duke Ellington featuring a memorable horn section arrangement.",
        cover_image_url="https://example.com/covers/songs_key_life.jpg",
        release_date=datetime(1976, 9, 28),
        created_at=datetime(2023, 7, 25, 15, 35, 0),
        updated_at=datetime(2023, 7, 25, 15, 35, 0)
    ),
    SongModel(
        id=16,
        title="Isn't She Lovely",
        artist="Stevie Wonder",
        genre="R&B",
        file_url="/songs/stevie_wonder/isnt_she_lovely.mp3",
        duration=397,  # 6:37
        description="A joyful celebration of the birth of Wonder's daughter Aisha.",
        cover_image_url="https://example.com/covers/songs_key_life.jpg",
        release_date=datetime(1976, 9, 28),
        created_at=datetime(2023, 7, 25, 15, 35, 0),
        updated_at=datetime(2023, 7, 25, 15, 35, 0)
    ),
    
    # Songs for "For Emma, Forever Ago" (Album ID: 8)
    SongModel(
        id=17,
        title="Skinny Love",
        artist="Bon Iver",
        genre="Indie Folk",
        file_url="/songs/bon_iver/skinny_love.mp3",
        duration=238,  # 3:58
        description="A haunting falsetto ballad about the end of a relationship.",
        cover_image_url="https://example.com/covers/for_emma.jpg",
        release_date=datetime(2007, 7, 8),
        created_at=datetime(2023, 8, 14, 12, 25, 0),
        updated_at=datetime(2023, 8, 14, 12, 25, 0)
    ),
    SongModel(
        id=18,
        title="Re: Stacks",
        artist="Bon Iver",
        genre="Indie Folk",
        file_url="/songs/bon_iver/re_stacks.mp3",
        duration=390,  # 6:30
        description="The album's closing track featuring layered vocals and minimal instrumentation.",
        cover_image_url="https://example.com/covers/for_emma.jpg",
        release_date=datetime(2007, 7, 8),
        created_at=datetime(2023, 8, 14, 12, 25, 0),
        updated_at=datetime(2023, 8, 14, 12, 25, 0)
    ),
]

# =============================================================================
# HELPER FUNCTIONS FOR TESTS
# =============================================================================

def get_album_by_id(album_id: int) -> AlbumModel:
    """Get a mock album by ID for testing."""
    return next((album for album in MOCK_ALBUMS if album.id == album_id), None)

def get_songs_by_album_id(album_id: int) -> list[SongModel]:
    """Get all mock songs for a specific album (based on realistic groupings)."""
    song_album_mapping = {
        1: [1, 2, 3],      # The Dark Side of the Moon
        2: [4, 5, 6],      # Thriller  
        3: [7, 8],         # good kid, m.A.A.d city
        4: [9, 10],        # Kind of Blue
        5: [11, 12],       # Random Access Memories
        6: [13, 14],       # OK Computer
        7: [15, 16],       # Songs in the Key of Life
        8: [17, 18]        # For Emma, Forever Ago
    }
    
    song_ids = song_album_mapping.get(album_id, [])
    return [song for song in MOCK_SONGS if song.id in song_ids]

def get_albums_by_genre(genre: str) -> list[AlbumModel]:
    """Get all mock albums of a specific genre."""
    return [album for album in MOCK_ALBUMS if album.genre.lower() == genre.lower()]

def get_albums_by_artist(artist: str) -> list[AlbumModel]:
    """Get all mock albums by a specific artist."""
    return [album for album in MOCK_ALBUMS if artist.lower() in album.artist.lower()]

def get_album_for_create_test() -> dict:
    """Get album data for POST/create tests (as dict for JSON serialization)."""
    return {
        "title": "Test Album for Creation",
        "artist": "Test Artist",
        "genre": "Test Genre",
        "description": "A test album created during API testing",
        "cover_image_url": "https://example.com/test_covers/create_test.jpg"
    }

def get_album_for_update_test() -> dict:
    """Get album data for PUT/update tests (as dict for JSON serialization)."""
    return {
        "title": "Updated Test Album",
        "artist": "Updated Test Artist", 
        "genre": "Updated Genre",
        "description": "An updated test album description",
        "cover_image_url": "https://example.com/test_covers/update_test.jpg"
    }

def get_invalid_album_data() -> dict:
    """Get invalid album data for validation testing."""
    return {
        "artist": "Artist Without Title",
        "genre": "Invalid Genre"
        # Missing required 'title' field
    }

# =============================================================================
# SUMMARY STATISTICS FOR TEST VALIDATION
# =============================================================================

MOCK_DATA_STATS = {
    "total_albums": len(MOCK_ALBUMS),
    "total_songs": len(MOCK_SONGS),
    "genres": list(set(album.genre for album in MOCK_ALBUMS)),
    "artists": list(set(album.artist for album in MOCK_ALBUMS)),
    "average_songs_per_album": len(MOCK_SONGS) / len(MOCK_ALBUMS) if MOCK_ALBUMS else 0
}

def print_mock_data_summary():
    """Print a summary of the mock data for debugging tests."""
    print("🎵 Mock Data Summary:")
    print(f"   Albums: {MOCK_DATA_STATS['total_albums']}")
    print(f"   Songs: {MOCK_DATA_STATS['total_songs']}")
    print(f"   Genres: {', '.join(MOCK_DATA_STATS['genres'])}")
    print(f"   Avg songs/album: {MOCK_DATA_STATS['average_songs_per_album']:.1f}")

if __name__ == "__main__":
    # If run directly, print summary of mock data
    print_mock_data_summary()
