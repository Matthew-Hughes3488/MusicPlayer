import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import type { Song, Album } from '../types';
import { 
  MagnifyingGlassIcon,
  PlayIcon,
  MusicalNoteIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'songs' | 'albums'>('songs');

  useEffect(() => {
    // Load all music on component mount
    loadAllMusic();
  }, []);

  const loadAllMusic = async () => {
    try {
      setLoading(true);
      const [songsData, albumsData] = await Promise.all([
        apiService.getAllSongs().catch(() => []),
        apiService.getAllAlbums().catch(() => [])
      ]);
      setSongs(songsData);
      setAlbums(albumsData);
    } catch (err) {
      console.error('Failed to load music:', err);
      setError('Failed to load music. Using demo data.');
      // Fallback demo data
      setSongs([
        {
          song_id: 1,
          title: "Bohemian Rhapsody",
          artist: "Queen",
          album_id: 1,
          duration: 355,
          genre: "Rock"
        },
        {
          song_id: 2,
          title: "Hotel California",
          artist: "Eagles",
          album_id: 2,
          duration: 391,
          genre: "Rock"
        },
        {
          song_id: 3,
          title: "Billie Jean",
          artist: "Michael Jackson",
          album_id: 3,
          duration: 294,
          genre: "Pop"
        }
      ]);
      setAlbums([
        {
          album_id: 1,
          title: "A Night at the Opera",
          artist: "Queen",
          release_date: "1975-11-21",
          genre: "Rock"
        },
        {
          album_id: 2,
          title: "Hotel California",
          artist: "Eagles",
          release_date: "1976-12-08",
          genre: "Rock"
        },
        {
          album_id: 3,
          title: "Thriller",
          artist: "Michael Jackson",
          release_date: "1982-11-30",
          genre: "Pop"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      loadAllMusic();
      return;
    }

    try {
      setLoading(true);
      const [searchSongs, searchAlbums] = await Promise.all([
        apiService.searchSongs(query).catch(() => []),
        apiService.searchAlbums(query).catch(() => [])
      ]);
      setSongs(searchSongs);
      setAlbums(searchAlbums);
    } catch {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(query.toLowerCase()) ||
    album.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Music</h1>
          
          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for songs, albums, or artists..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-4" />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
              {error}
            </div>
          )}

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
            <button
              onClick={() => setActiveTab('songs')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'songs'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Songs ({filteredSongs.length})
            </button>
            <button
              onClick={() => setActiveTab('albums')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'albums'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Albums ({filteredAlbums.length})
            </button>
          </div>
        </div>

        {/* Results */}
        {activeTab === 'songs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSongs.map((song) => (
              <div key={song.song_id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{song.title}</h3>
                    <p className="text-gray-600 text-sm mb-1">{song.artist}</p>
                    <p className="text-gray-500 text-xs mb-2">
                      {formatDuration(song.duration)} • {song.genre || 'Unknown Genre'}
                    </p>
                  </div>
                  <MusicalNoteIcon className="h-8 w-8 text-gray-300" />
                </div>
                <Link
                  to={`/play?songId=${song.song_id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  <PlayIcon className="h-4 w-4 mr-1" />
                  Play
                </Link>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'albums' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAlbums.map((album) => (
              <div key={album.album_id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
                <div className="text-center">
                  <div className="bg-gray-200 rounded-lg w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                    {album.cover_image ? (
                      <img 
                        src={album.cover_image} 
                        alt={album.title} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <PhotoIcon className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{album.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">{album.artist}</p>
                  <p className="text-gray-500 text-xs mb-3">{album.release_date}</p>
                  <Link
                    to={`/play?albumId=${album.album_id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    <PlayIcon className="h-4 w-4 mr-1" />
                    Play Album
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {((activeTab === 'songs' && filteredSongs.length === 0) || 
          (activeTab === 'albums' && filteredAlbums.length === 0)) && !loading && (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">
              {query ? `No ${activeTab} match "${query}"` : `No ${activeTab} available`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}