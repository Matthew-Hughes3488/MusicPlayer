import React from 'react';

const TrackItem = ({ 
  track, 
  isCurrentTrack, 
  isPlaying, 
  onPlay, 
  onAddToPlaylist,
  showIndex = false,
  index = 0
}) => {
  const handlePlay = () => {
    onPlay(track);
  };

  const handleAddToPlaylist = (e) => {
    e.stopPropagation();
    onAddToPlaylist(track);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    // TODO: Implement like functionality
    console.log('Like track:', track.id);
  };

  return (
    <div
      className={`group flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors ${
        isCurrentTrack
          ? 'bg-purple-600 bg-opacity-20 border border-purple-500 border-opacity-30'
          : 'hover:bg-gray-800'
      }`}
      onClick={handlePlay}
    >
      {/* Index/Play Button */}
      <div className="w-8 h-8 flex items-center justify-center">
        {showIndex && !isCurrentTrack && (
          <span className="text-sm text-gray-400 group-hover:hidden">
            {index + 1}
          </span>
        )}
        {isCurrentTrack && isPlaying ? (
          <div className="flex space-x-1">
            <div className="w-1 h-4 bg-purple-400 animate-pulse"></div>
            <div className="w-1 h-4 bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-4 bg-purple-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        ) : (
          <button className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
            isCurrentTrack ? 'bg-purple-600 text-white' : 'bg-white text-black opacity-0 group-hover:opacity-100 hover:scale-110'
          }`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* Album Art */}
      <img
        src={track.coverArt}
        alt={track.title}
        className="w-12 h-12 rounded-lg"
      />

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-medium truncate ${
          isCurrentTrack ? 'text-purple-400' : 'text-white'
        }`}>
          {track.title}
        </h4>
        <p className="text-sm text-gray-400 truncate">
          {track.artist}
        </p>
      </div>

      {/* Album Name (hidden on mobile) */}
      <div className="hidden md:block flex-1 min-w-0">
        <p className="text-sm text-gray-400 truncate">
          {track.album}
        </p>
      </div>

      {/* Duration and Actions */}
      <div className="flex items-center space-x-2">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`p-1 rounded-full transition-colors ${
            track.liked
              ? 'text-purple-400'
              : 'text-gray-400 hover:text-white opacity-0 group-hover:opacity-100'
          }`}
          title={track.liked ? 'Unlike' : 'Like'}
        >
          <svg className="w-4 h-4" fill={track.liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Duration */}
        <span className="text-sm text-gray-400 w-12 text-right">
          {track.duration}
        </span>

        {/* More Options */}
        <button
          onClick={handleAddToPlaylist}
          className="p-1 rounded-full text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-colors"
          title="Add to playlist"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TrackItem;