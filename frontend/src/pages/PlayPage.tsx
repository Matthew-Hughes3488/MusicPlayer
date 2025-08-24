import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import type { Song, Album } from '../types';
import { 
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
  SpeakerWaveIcon,
  PhotoIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

export default function PlayPage() {
  const [searchParams] = useSearchParams();
  const songId = searchParams.get('songId');
  const albumId = searchParams.get('albumId');
  
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null);
  const [albumSongs, setAlbumSongs] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadContent();
  }, [songId, albumId]);

  useEffect(() => {
    // Mock audio progress simulation
    let interval: NodeJS.Timeout;
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          if (newTime >= currentSong.duration) {
            setIsPlaying(false);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong]);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError('');

      if (songId) {
        // Load specific song
        try {
          const song = await apiService.getSongById(parseInt(songId));
          setCurrentSong(song);
          const album = await apiService.getAlbumById(song.album_id);
          setCurrentAlbum(album);
        } catch {
          // Fallback demo data
          const demoSong = {
            song_id: parseInt(songId),
            title: "Demo Song",
            artist: "Demo Artist",
            album_id: 1,
            duration: 240,
            genre: "Demo"
          };
          setCurrentSong(demoSong);
          setError('Using demo data - backend not available');
        }
      } else if (albumId) {
        // Load album and first song
        try {
          const album = await apiService.getAlbumById(parseInt(albumId));
          const songs = await apiService.getAlbumSongs(parseInt(albumId));
          setCurrentAlbum(album);
          setAlbumSongs(songs);
          if (songs.length > 0) {
            setCurrentSong(songs[0]);
          }
        } catch {
          // Fallback demo data
          const demoAlbum = {
            album_id: parseInt(albumId),
            title: "Demo Album",
            artist: "Demo Artist",
            release_date: "2023-01-01",
            genre: "Demo"
          };
          const demoSongs = [
            {
              song_id: 1,
              title: "Demo Song 1",
              artist: "Demo Artist",
              album_id: parseInt(albumId),
              duration: 240,
              genre: "Demo"
            }
          ];
          setCurrentAlbum(demoAlbum);
          setAlbumSongs(demoSongs);
          setCurrentSong(demoSongs[0]);
          setError('Using demo data - backend not available');
        }
      }
    } catch (err) {
      console.error('Failed to load content:', err);
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const playNextSong = () => {
    if (albumSongs.length > 0 && currentSong) {
      const currentIndex = albumSongs.findIndex(song => song.song_id === currentSong.song_id);
      const nextIndex = (currentIndex + 1) % albumSongs.length;
      setCurrentSong(albumSongs[nextIndex]);
      setCurrentTime(0);
    }
  };

  const playPreviousSong = () => {
    if (albumSongs.length > 0 && currentSong) {
      const currentIndex = albumSongs.findIndex(song => song.song_id === currentSong.song_id);
      const prevIndex = currentIndex === 0 ? albumSongs.length - 1 : currentIndex - 1;
      setCurrentSong(albumSongs[prevIndex]);
      setCurrentTime(0);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading music...</p>
        </div>
      </div>
    );
  }

  if (!currentSong) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No song selected</h2>
          <Link to="/search" className="text-blue-600 hover:text-blue-700">
            Go back to search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/search"
            className="inline-flex items-center text-white/70 hover:text-white mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Search
          </Link>
          
          {error && (
            <div className="mb-4 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-200">
              {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Player */}
          <div className="lg:col-span-2">
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8">
              {/* Album Art */}
              <div className="text-center mb-8">
                <div className="w-64 h-64 mx-auto bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
                  {currentAlbum?.cover_image ? (
                    <img 
                      src={currentAlbum.cover_image} 
                      alt={currentAlbum.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <PhotoIcon className="h-24 w-24 text-gray-500" />
                  )}
                </div>
                
                {/* Song Info */}
                <h1 className="text-3xl font-bold mb-2">{currentSong.title}</h1>
                <p className="text-xl text-white/70 mb-1">{currentSong.artist}</p>
                {currentAlbum && (
                  <p className="text-white/50">{currentAlbum.title}</p>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <input
                  type="range"
                  min="0"
                  max={currentSong.duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-white/70 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(currentSong.duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-6 mb-6">
                <button
                  onClick={playPreviousSong}
                  disabled={albumSongs.length === 0}
                  className="p-3 rounded-full hover:bg-white/10 disabled:opacity-50"
                >
                  <BackwardIcon className="h-6 w-6" />
                </button>
                
                <button
                  onClick={togglePlay}
                  className="p-4 bg-blue-600 hover:bg-blue-700 rounded-full"
                >
                  {isPlaying ? (
                    <PauseIcon className="h-8 w-8" />
                  ) : (
                    <PlayIcon className="h-8 w-8" />
                  )}
                </button>
                
                <button
                  onClick={playNextSong}
                  disabled={albumSongs.length === 0}
                  className="p-3 rounded-full hover:bg-white/10 disabled:opacity-50"
                >
                  <ForwardIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center justify-center space-x-4">
                <SpeakerWaveIcon className="h-5 w-5 text-white/70" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>

          {/* Playlist/Album Songs */}
          {albumSongs.length > 0 && (
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">
                {currentAlbum ? `${currentAlbum.title}` : 'Playlist'}
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {albumSongs.map((song, index) => (
                  <button
                    key={song.song_id}
                    onClick={() => {
                      setCurrentSong(song);
                      setCurrentTime(0);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentSong.song_id === song.song_id
                        ? 'bg-blue-600'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-sm text-white/50 w-8">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{song.title}</p>
                        <p className="text-sm text-white/70 truncate">{song.artist}</p>
                      </div>
                      <span className="text-sm text-white/50 ml-4">
                        {formatTime(song.duration)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Demo Note */}
        <div className="mt-8 p-4 bg-black/20 backdrop-blur-sm rounded-lg text-center text-white/70">
          <p className="text-sm">
            🎵 This is a mock music player. No actual audio is played in this demo.
          </p>
        </div>
      </div>

      {/* Custom CSS for sliders */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 0 2px 0 #555;
          transition: background .15s ease-in-out;
        }
        
        .slider::-webkit-slider-thumb:hover {
          background: #2563eb;
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}