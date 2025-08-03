import { useState } from 'react';
import { 
  Heart, 
  MoreHorizontal, 
  Share, 
  ExternalLink,
  Plus,
  Volume2,
  Maximize2
} from 'lucide-react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer.jsx';
import { useDummyData } from '../../hooks/useDummyData.js';
import { formatDuration, formatDate } from '../../utils/formatters.js';

export const NowPlaying = () => {
  const [showLyrics, setShowLyrics] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    progress,
    queue,
    currentIndex
  } = useAudioPlayer();
  
  const { 
    isTrackLiked, 
    toggleLikeTrack,
    getAllPlaylists,
    addTrackToPlaylist 
  } = useDummyData();

  if (!currentTrack) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-32 h-32 bg-slate-700 rounded-xl mb-6 flex items-center justify-center">
          <svg className="w-16 h-16 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">No track playing</h2>
        <p className="text-slate-400 mb-6">Select a song from your library to start listening</p>
        <button className="btn-primary">
          Browse Music
        </button>
      </div>
    );
  }

  const isLiked = isTrackLiked(currentTrack.id);
  const playlists = getAllPlaylists().filter(p => !p.isLikedSongs && !p.isRecentlyPlayed);

  const handleLike = () => {
    toggleLikeTrack(currentTrack.id);
  };

  const handleAddToPlaylist = (playlistId) => {
    addTrackToPlaylist(playlistId, currentTrack.id);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-8 flex flex-col">
        {/* Track Art and Info */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8 mb-8">
          {/* Album Art */}
          <div className="w-full max-w-md lg:w-80 lg:h-80 mx-auto lg:mx-0 mb-6 lg:mb-0">
            <div className="aspect-square relative group">
              <img
                src={currentTrack.cover_image_url}
                alt={currentTrack.title}
                className="w-full h-full object-cover rounded-xl shadow-2xl"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMzIwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0xNjAgMjAwVjIyOS41NUM0MS40IDE5NC44IDQwLjczIDIwMCA0MCAyMDBDMzcuNzkgMjAwIDM2IDIwMS43OSAzNiAyMDRTMzcuNzkgMjA4IDQwIDIwOFM0NCAyMDYuMjEgNDQgMjA0VjE4NEg0OFYxODBINDRWMjAwWiIgZmlsbD0iIzYzNjc3OCIvPgo8L3N2Zz4K';
                }}
              />
              
              {/* Play state overlay */}
              {isPlaying && (
                <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                  <div className="flex space-x-1">
                    <div className="w-1 h-8 bg-white/80 animate-pulse"></div>
                    <div className="w-1 h-8 bg-white/80 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-8 bg-white/80 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-8 bg-white/80 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Track Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-2">
                {currentTrack.title}
              </h1>
              <h2 className="text-xl lg:text-2xl text-slate-300 mb-4">
                {currentTrack.artist}
              </h2>
              
              {/* Track Details */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                {currentTrack.album && (
                  <span>{currentTrack.album}</span>
                )}
                <span>{currentTrack.genre}</span>
                <span>{formatDuration(currentTrack.duration)}</span>
                {currentTrack.release_date && (
                  <span>{formatDate(currentTrack.release_date)}</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`p-3 rounded-full transition-colors ${
                  isLiked 
                    ? 'bg-red-500/20 text-red-500' 
                    : 'bg-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
              </button>

              <div className="relative group">
                <button className="p-3 rounded-full bg-white/10 text-slate-400 hover:text-white transition-colors">
                  <Plus className="h-6 w-6" />
                </button>
                
                {/* Add to Playlist Dropdown */}
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50">
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs text-slate-400 uppercase tracking-wider">
                      Add to playlist
                    </div>
                    {playlists.slice(0, 5).map((playlist) => (
                      <button
                        key={playlist.id}
                        onClick={() => handleAddToPlaylist(playlist.id)}
                        className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {playlist.name}
                      </button>
                    ))}
                    <button className="w-full text-left px-3 py-2 text-sm text-primary-400 hover:bg-white/10 rounded-lg transition-colors">
                      Create new playlist
                    </button>
                  </div>
                </div>
              </div>

              <button className="p-3 rounded-full bg-white/10 text-slate-400 hover:text-white transition-colors">
                <Share className="h-6 w-6" />
              </button>

              <button className="p-3 rounded-full bg-white/10 text-slate-400 hover:text-white transition-colors">
                <MoreHorizontal className="h-6 w-6" />
              </button>
            </div>

            {/* Description */}
            {currentTrack.description && (
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {currentTrack.description}
                </p>
              </div>
            )}

            {/* Lyrics Toggle */}
            <button
              onClick={() => setShowLyrics(!showLyrics)}
              className="btn-ghost text-left"
            >
              {showLyrics ? 'Hide lyrics' : 'Show lyrics'}
            </button>
          </div>
        </div>

        {/* Lyrics Section */}
        {showLyrics && (
          <div className="flex-1 bg-white/5 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Lyrics</h3>
            <div className="text-slate-300 leading-relaxed">
              <p className="mb-4">
                <em>Lyrics not available for this track in demo mode.</em>
              </p>
              <p className="text-sm text-slate-400">
                In the full version, lyrics would be displayed here with synchronized highlighting.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Queue Sidebar */}
      <div className={`w-full lg:w-80 bg-white/5 border-l border-white/10 transition-transform duration-200 ${
        showQueue ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Queue</h3>
            <button
              onClick={() => setShowQueue(!showQueue)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white"
            >
              ×
            </button>
          </div>

          {/* Current Track */}
          <div className="mb-6">
            <div className="text-sm text-slate-400 uppercase tracking-wider mb-2">
              Now Playing
            </div>
            <div className="p-3 bg-primary-600/20 rounded-lg border border-primary-500/30">
              <div className="flex items-center space-x-3">
                <img
                  src={currentTrack.cover_image_url}
                  alt={currentTrack.title}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white truncate">
                    {currentTrack.title}
                  </div>
                  <div className="text-sm text-slate-300 truncate">
                    {currentTrack.artist}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Up Next */}
          <div>
            <div className="text-sm text-slate-400 uppercase tracking-wider mb-2">
              Up Next ({queue.length - currentIndex - 1} tracks)
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {queue.slice(currentIndex + 1).map((track, index) => (
                <div key={`${track.id}-${index}`} className="p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <img
                      src={track.cover_image_url}
                      alt={track.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white truncate">
                        {track.title}
                      </div>
                      <div className="text-sm text-slate-400 truncate">
                        {track.artist}
                      </div>
                    </div>
                    <div className="text-sm text-slate-400">
                      {formatDuration(track.duration)}
                    </div>
                  </div>
                </div>
              ))}
              
              {queue.length - currentIndex - 1 === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <p>No more tracks in queue</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Queue Toggle */}
      <button
        onClick={() => setShowQueue(!showQueue)}
        className="lg:hidden fixed bottom-24 right-4 p-3 bg-primary-600 text-white rounded-full shadow-lg z-50"
      >
        <Volume2 className="h-6 w-6" />
      </button>
    </div>
  );
};