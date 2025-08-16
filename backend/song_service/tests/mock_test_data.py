"""
Mock Test Data for Song Service API Tests

This file contains realistic mock data for testing the Song Service API.
All data is in SQLAlchemy model format for direct insertion into test databases.

Usage:
    from backend.song_service.tests.mock_test_data import MOCK_SONGS
    
    # In your test setup
    db_session.add_all(MOCK_SONGS)
    db_session.commit()
"""

from datetime import datetime
from backend.database.models.song_model import Song as SongModel

# =============================================================================
# MOCK SONGS - Realistic song data across different genres
# =============================================================================

MOCK_SONGS = [
    # Rock Songs
    SongModel(
        id=1,
        title="Bohemian Rhapsody",
        artist="Queen",
        genre="Rock",
        file_url="/songs/queen/bohemian_rhapsody.mp3",
        duration=354,  # 5:54
        description="Epic rock opera featuring multiple musical styles and iconic vocals.",
        cover_image_url="https://example.com/covers/queen_night_opera.jpg",
        release_date=datetime(1975, 10, 31),
        created_at=datetime(2023, 1, 10, 9, 0, 0),
        updated_at=datetime(2023, 1, 10, 9, 0, 0)
    ),
    
    SongModel(
        id=2,
        title="Stairway to Heaven",
        artist="Led Zeppelin",
        genre="Rock",
        file_url="/songs/led_zeppelin/stairway_to_heaven.mp3",
        duration=482,  # 8:02
        description="One of the greatest rock songs ever written, building from acoustic to electric.",
        cover_image_url="https://example.com/covers/led_zeppelin_iv.jpg",
        release_date=datetime(1971, 11, 8),
        created_at=datetime(2023, 1, 15, 11, 30, 0),
        updated_at=datetime(2023, 1, 15, 11, 30, 0)
    ),
    
    # Pop Songs
    SongModel(
        id=3,
        title="Shape of You",
        artist="Ed Sheeran",
        genre="Pop",
        file_url="/songs/ed_sheeran/shape_of_you.mp3",
        duration=233,  # 3:53
        description="Upbeat pop song with dancehall influences and catchy lyrics.",
        cover_image_url="https://example.com/covers/ed_sheeran_divide.jpg",
        release_date=datetime(2017, 1, 6),
        created_at=datetime(2023, 2, 5, 14, 15, 0),
        updated_at=datetime(2023, 2, 5, 14, 15, 0)
    ),
    
    SongModel(
        id=4,
        title="Blinding Lights",
        artist="The Weeknd",
        genre="Pop",
        file_url="/songs/the_weeknd/blinding_lights.mp3",
        duration=200,  # 3:20
        description="Synthwave-influenced pop song with 80s nostalgia.",
        cover_image_url="https://example.com/covers/the_weeknd_after_hours.jpg",
        release_date=datetime(2019, 11, 29),
        created_at=datetime(2023, 2, 12, 16, 45, 0),
        updated_at=datetime(2023, 2, 12, 16, 45, 0)
    ),
    
    # Hip-Hop Songs
    SongModel(
        id=5,
        title="HUMBLE.",
        artist="Kendrick Lamar",
        genre="Hip-Hop",
        file_url="/songs/kendrick_lamar/humble.mp3",
        duration=177,  # 2:57
        description="Hard-hitting track with minimalist production and powerful lyrics.",
        cover_image_url="https://example.com/covers/kendrick_damn.jpg",
        release_date=datetime(2017, 3, 30),
        created_at=datetime(2023, 3, 8, 10, 20, 0),
        updated_at=datetime(2023, 3, 8, 10, 20, 0)
    ),
    
    SongModel(
        id=6,
        title="God's Plan",
        artist="Drake",
        genre="Hip-Hop",
        file_url="/songs/drake/gods_plan.mp3",
        duration=198,  # 3:18
        description="Melodic rap track about success and giving back to the community.",
        cover_image_url="https://example.com/covers/drake_scorpion.jpg",
        release_date=datetime(2018, 1, 19),
        created_at=datetime(2023, 3, 20, 13, 10, 0),
        updated_at=datetime(2023, 3, 20, 13, 10, 0)
    ),
    
    # Electronic Songs
    SongModel(
        id=7,
        title="One More Time",
        artist="Daft Punk",
        genre="Electronic",
        file_url="/songs/daft_punk/one_more_time.mp3",
        duration=320,  # 5:20
        description="Uplifting house track with vocoder vocals and disco influences.",
        cover_image_url="https://example.com/covers/daft_punk_discovery.jpg",
        release_date=datetime(2000, 11, 30),
        created_at=datetime(2023, 4, 2, 15, 25, 0),
        updated_at=datetime(2023, 4, 2, 15, 25, 0)
    ),
    
    SongModel(
        id=8,
        title="Strobe",
        artist="Deadmau5",
        genre="Electronic",
        file_url="/songs/deadmau5/strobe.mp3",
        duration=632,  # 10:32
        description="Progressive house epic that builds over 10+ minutes.",
        cover_image_url="https://example.com/covers/deadmau5_for_lack.jpg",
        release_date=datetime(2009, 5, 25),
        created_at=datetime(2023, 4, 15, 12, 0, 0),
        updated_at=datetime(2023, 4, 15, 12, 0, 0)
    ),
    
    # Jazz Songs
    SongModel(
        id=9,
        title="Take Five",
        artist="Dave Brubeck",
        genre="Jazz",
        file_url="/songs/dave_brubeck/take_five.mp3",
        duration=324,  # 5:24
        description="Famous jazz standard in 5/4 time with iconic saxophone solo.",
        cover_image_url="https://example.com/covers/brubeck_time_out.jpg",
        release_date=datetime(1959, 8, 1),
        created_at=datetime(2023, 5, 10, 9, 30, 0),
        updated_at=datetime(2023, 5, 10, 9, 30, 0)
    ),
    
    SongModel(
        id=10,
        title="Fly Me to the Moon",
        artist="Frank Sinatra",
        genre="Jazz",
        file_url="/songs/frank_sinatra/fly_me_to_the_moon.mp3",
        duration=148,  # 2:28
        description="Classic jazz standard with Sinatra's signature smooth vocals.",
        cover_image_url="https://example.com/covers/sinatra_it_might.jpg",
        release_date=datetime(1964, 6, 9),
        created_at=datetime(2023, 5, 22, 17, 15, 0),
        updated_at=datetime(2023, 5, 22, 17, 15, 0)
    ),
    
    # Alternative/Indie Songs
    SongModel(
        id=11,
        title="Radioactive",
        artist="Imagine Dragons",
        genre="Alternative",
        file_url="/songs/imagine_dragons/radioactive.mp3",
        duration=187,  # 3:07
        description="Anthemic rock song with electronic elements and powerful drums.",
        cover_image_url="https://example.com/covers/imagine_dragons_night.jpg",
        release_date=datetime(2012, 4, 2),
        created_at=datetime(2023, 6, 8, 14, 40, 0),
        updated_at=datetime(2023, 6, 8, 14, 40, 0)
    ),
    
    SongModel(
        id=12,
        title="Somebody That I Used to Know",
        artist="Gotye",
        genre="Alternative",
        file_url="/songs/gotye/somebody_used_to_know.mp3",
        duration=244,  # 4:04
        description="Melancholic indie pop song featuring Kimbra with unique production.",
        cover_image_url="https://example.com/covers/gotye_making_mirrors.jpg",
        release_date=datetime(2011, 7, 5),
        created_at=datetime(2023, 6, 18, 11, 55, 0),
        updated_at=datetime(2023, 6, 18, 11, 55, 0)
    ),
]

# =============================================================================
# HELPER FUNCTIONS FOR TESTS
# =============================================================================

def get_song_by_id(song_id: int) -> SongModel:
    """Get a mock song by ID for testing."""
    return next((song for song in MOCK_SONGS if song.id == song_id), None)

def get_songs_by_genre(genre: str) -> list[SongModel]:
    """Get all mock songs of a specific genre."""
    return [song for song in MOCK_SONGS if song.genre.lower() == genre.lower()]

def get_songs_by_artist(artist: str) -> list[SongModel]:
    """Get all mock songs by a specific artist."""
    return [song for song in MOCK_SONGS if artist.lower() in song.artist.lower()]

def get_songs_by_duration_range(min_duration: int, max_duration: int) -> list[SongModel]:
    """Get songs within a duration range (in seconds)."""
    return [song for song in MOCK_SONGS if min_duration <= song.duration <= max_duration]

def get_song_for_create_test() -> dict:
    """Get song data for POST/create tests (as dict for JSON serialization)."""
    return {
        "title": "Test Song for Creation",
        "artist": "Test Artist",
        "genre": "Test Genre",
        "file_url": "/songs/test/create_test.mp3",
        "duration": 180,
        "description": "A test song created during API testing",
        "cover_image_url": "https://example.com/test_covers/create_test.jpg"
    }

def get_song_for_update_test() -> dict:
    """Get song data for PUT/update tests (as dict for JSON serialization)."""
    return {
        "title": "Updated Test Song",
        "artist": "Updated Test Artist", 
        "genre": "Updated Genre",
        "file_url": "/songs/test/update_test.mp3",
        "duration": 200,
        "description": "An updated test song description",
        "cover_image_url": "https://example.com/test_covers/update_test.jpg"
    }

def get_invalid_song_data() -> dict:
    """Get invalid song data for validation testing."""
    return {
        "artist": "Artist Without Title",
        "genre": "Invalid Genre"
        # Missing required 'title' and 'file_url' fields
    }

# =============================================================================
# SUMMARY STATISTICS FOR TEST VALIDATION
# =============================================================================

MOCK_DATA_STATS = {
    "total_songs": len(MOCK_SONGS),
    "genres": list(set(song.genre for song in MOCK_SONGS)),
    "artists": list(set(song.artist for song in MOCK_SONGS)),
    "average_duration": sum(song.duration for song in MOCK_SONGS) / len(MOCK_SONGS) if MOCK_SONGS else 0
}

def print_mock_data_summary():
    """Print a summary of the mock data for debugging tests."""
    print("🎵 Song Service Mock Data Summary:")
    print(f"   Songs: {MOCK_DATA_STATS['total_songs']}")
    print(f"   Genres: {', '.join(MOCK_DATA_STATS['genres'])}")
    print(f"   Avg duration: {MOCK_DATA_STATS['average_duration']:.1f}s")

if __name__ == "__main__":
    # If run directly, print summary of mock data
    print_mock_data_summary()
