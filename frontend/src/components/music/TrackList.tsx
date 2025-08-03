import React from 'react';
import TrackItem from './TrackItem.tsx';

const TrackList = ({ 
  tracks = [], 
  currentTrack, 
  isPlaying, 
  onTrackPlay,
  onAddToPlaylist,
  title = "All Songs",
  showHeader = true,
  showIndex = true
}) => {
  const handlePlayAll = () => {
    if (tracks.length > 0) {
      onTrackPlay(tracks[0], tracks, 0);
    }
  };

  const handleShuffle = () => {
    if (tracks.length > 0) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      onTrackPlay(tracks[randomIndex], tracks, randomIndex);
    }
  };

  const handleTrackPlay = (track) => {
    const trackIndex = tracks.findIndex(t => t.id === track.id);
    onTrackPlay(track, tracks, trackIndex);
  };

  if (tracks.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        <h3 className="text-lg font-medium text-gray-300 mb-2">No songs found</h3>
        <p className="text-gray-500">Add some music to your library to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      {showHeader && (
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
            <p className="text-gray-400">
              {tracks.length} song{tracks.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePlayAll}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Play All</span>
            </button>
            
            <button
              onClick={handleShuffle}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full font-medium transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0l2 2m8-2l-2 2m-8 14V6m0 12l2-2m-2 2l-2-2m10-12v12m0-12l-2 2m2-2l2 2" />
              </svg>
              <span>Shuffle</span>
            </button>
          </div>
        </div>
      )}

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-700">
        <div className="col-span-1">#</div>
        <div className="col-span-5">Title</div>
        <div className="col-span-3 hidden md:block">Album</div>
        <div className="col-span-3 md:col-span-2 text-right">Duration</div>
        <div className="col-span-1"></div>
      </div>

      {/* Track List */}
      <div className="space-y-1">
        {tracks.map((track, index) => (
          <TrackItem
            key={track.id}
            track={track}
            index={index}
            isCurrentTrack={currentTrack?.id === track.id}
            isPlaying={isPlaying && currentTrack?.id === track.id}
            onPlay={handleTrackPlay}
            onAddToPlaylist={onAddToPlaylist}
            showIndex={showIndex}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="pt-6 border-t border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{tracks.length}</p>
            <p className="text-sm text-gray-400">Total Songs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {new Set(tracks.map(track => track.artist)).size}
            </p>
            <p className="text-sm text-gray-400">Artists</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {new Set(tracks.map(track => track.album)).size}
            </p>
            <p className="text-sm text-gray-400">Albums</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackList;