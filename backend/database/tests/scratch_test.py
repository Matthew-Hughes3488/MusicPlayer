from connector import DatabaseConnector
from backend.database.models.album_model import Album
from backend.database.models.song_model import Song
from backend.database.models.user_model import User  # <-- Add this!

session = DatabaseConnector().get_session()

print("========================================")

# 1. Get all albums
all_albums = session.query(Album).all()
for a in all_albums:
    print(a.id, a.title, a.artist, a.genre, a.description)

# 2. Get one album by ID
album = session.query(Album).get(1)
print(album.title, album.artist) if album else print("Album not found")

# 3. Filter albums by genre
rock_albums = session.query(Album).filter_by(genre="Rock").all()
for a in rock_albums:
    print(a.title, a.artist)

# 4. Search albums by partial name
search = session.query(Album).filter(Album.title.ilike("%Classic%")).all()
for a in search:
    print(a.title)

print("=================JOIN TEST====================")

album = session.query(Album).filter_by(title="Definitely Maybe", artist="Oasis").first()

if album:
    print(f"Songs on '{album.title}':")
    for song in album.songs:
        print(f"- {song.title} by {song.artist}")
        print(f"file path is {song.file_url}")
else:
    print("Album not found.")