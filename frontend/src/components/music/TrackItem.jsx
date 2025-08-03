import { useState } from 'react';
import { Play, Pause, Heart, MoreHorizontal, Clock } from 'lucide-react';
import { formatDuration } from '../../utils/formatters.js';
import { useAudioPlayer } from '../../hooks/useAudioPlayer.jsx';
import { useDummyData } from '../../hooks/useDummyData.js';

export const TrackItem = ({ track, index, showAlbum = true, showDuration = true, isPlaylist = false }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { 
    currentTrack, 
    isPlaying, 
    playTrack,
    togglePlayPause,
    addToQueue 
  } = useAudioPlayer();
  
  const { 
    isTrackLiked, 
    toggleLikeTrack,
    addTrackToPlaylist,
    getAllPlaylists 
  } = useDummyData();

  const isCurrentTrack = currentTrack?.id === track.id;
  const isLiked = isTrackLiked(track.id);
  const playlists = getAllPlaylists().filter(p => !p.isLikedSongs && !p.isRecentlyPlayed);

  const handlePlay = () => {
    if (isCurrentTrack) {
      togglePlayPause();
    } else {
      playTrack(track);
    }
  };

  const handleLike = () => {
    toggleLikeTrack(track.id);
  };

  const handleAddToPlaylist = (playlistId) => {
    addTrackToPlaylist(playlistId, track.id);
    setShowMenu(false);
  };

  return (
    <div className={`track-item group ${isCurrentTrack ? 'bg-white/10' : ''}`}>
      {/* Track Number / Play Button */}
      <div className="w-8 flex items-center justify-center text-sm text-slate-400">
        <span className="group-hover:hidden">
          {isCurrentTrack && isPlaying ? (
            <div className="flex space-x-0.5">
              <div className="w-1 h-3 bg-primary-500 animate-pulse"></div>
              <div className="w-1 h-3 bg-primary-500 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-3 bg-primary-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          ) : (
            index + 1
          )}
        </span>
        <button
          onClick={handlePlay}
          className="hidden group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-white text-black hover:scale-105 transition-transform"
        >
          {isCurrentTrack && isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </button>
      </div>

      {/* Track Info */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <img
          src={track.cover_image_url}
          alt={track.title}
          className="w-12 h-12 rounded object-cover bg-slate-700"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0yNCAzMFYzNi41NUM0MS40IDI5LjggNDAuNzMgMzAgNDAgMzBDMzcuNzkgMzAgMzYgMzEuNzkgMzYgMzRTMzcuNzkgMzggNDAgMzhTNDQgMzYuMjEgNDQgMzRWMjRINDhWMjBINDRWMzBaIiBmaWxsPSIjNjM2Nzc4Ii8+Cjwvc3ZnPgo=';
          }}
        />
        <div className="flex-1 min-w-0">
          <div className={`font-medium truncate ${isCurrentTrack ? 'text-primary-400' : 'text-white'}`}>
            {track.title}
          </div>
          <div className="text-sm text-slate-400 truncate">
            {track.artist}
          </div>
        </div>
      </div>

      {/* Album */}
      {showAlbum && (
        <div className="hidden md:block w-48 text-sm text-slate-400 truncate">
          {track.album || 'Unknown Album'}
        </div>
      )}

      {/* Genre */}
      <div className="hidden lg:block w-24 text-sm text-slate-400 truncate">
        {track.genre}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100 ${
            isLiked 
              ? 'text-red-500 opacity-100' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Duration */}
        {showDuration && (
          <div className="w-12 text-right text-sm text-slate-400">
            {formatDuration(track.duration)}
          </div>
        )}

        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-white/10 z-50">
              <div className="p-2">
                <button
                  onClick={() => {
                    addToQueue(track);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  Add to queue
                </button>
                <button
                  onClick={handleLike}
                  className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isLiked ? 'Remove from Liked Songs' : 'Add to Liked Songs'}
                </button>
                
                {playlists.length > 0 && (
                  <>
                    <hr className="my-2 border-white/10" />
                    <div className="px-3 py-1 text-xs text-slate-400 uppercase tracking-wider">
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
                  </>
                )}
                
                <hr className="my-2 border-white/10" />
                <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors">
                  View album
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors">
                  View artist
                </button>
                {isPlaylist && (
                  <button className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                    Remove from playlist
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside handler */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};