import React from 'react';

const NowPlaying = ({ 
  currentTrack, 
  isPlaying, 
  currentTime, 
  duration, 
  progress,
  onSeek,
  onLike
}) => {
  const handleProgressClick = (e) => {
    if (!duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    onSeek(newTime);
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLike = () => {
    if (currentTrack) {
      onLike(currentTrack);
    }
  };

  if (!currentTrack) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl">
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-700 rounded-xl mx-auto mb-6 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-300 mb-2">No song playing</h3>
          <p className="text-gray-500">Select a track to see it here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 p-8 rounded-xl text-white">
      <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Album Art */}
        <div className="relative">
          <img
            src={currentTrack.coverArt}
            alt={currentTrack.title}
            className="w-48 h-48 rounded-xl shadow-2xl"
          />
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-xl">
              <div className="flex space-x-1">
                <div className="w-2 h-8 bg-white animate-pulse rounded-full"></div>
                <div className="w-2 h-6 bg-white animate-pulse rounded-full" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-10 bg-white animate-pulse rounded-full" style={{ animationDelay: '0.4s' }}></div>
                <div className="w-2 h-6 bg-white animate-pulse rounded-full" style={{ animationDelay: '0.6s' }}></div>
                <div className="w-2 h-8 bg-white animate-pulse rounded-full" style={{ animationDelay: '0.8s' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-2">{currentTrack.title}</h2>
          <p className="text-xl text-purple-200 mb-1">{currentTrack.artist}</p>
          <p className="text-lg text-purple-300 mb-4">{currentTrack.album}</p>
          
          <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
            <span className="px-3 py-1 bg-purple-700 rounded-full text-sm">
              {currentTrack.genre}
            </span>
            <span className="px-3 py-1 bg-purple-700 rounded-full text-sm">
              {currentTrack.year}
            </span>
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors ${
                currentTrack.liked
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-purple-700 hover:bg-purple-600'
              }`}
              title={currentTrack.liked ? 'Unlike' : 'Like'}
            >
              <svg className="w-5 h-5" fill={currentTrack.liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div
              className="h-2 bg-purple-700 rounded-full cursor-pointer relative"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-white rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute w-4 h-4 bg-white rounded-full transform -translate-y-1/2 -translate-x-1/2 top-1/2 shadow-lg"
                style={{ left: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-purple-200">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 pt-6 border-t border-purple-700 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-purple-200 text-sm">Duration</p>
          <p className="font-semibold">{currentTrack.duration}</p>
        </div>
        <div>
          <p className="text-purple-200 text-sm">Status</p>
          <p className="font-semibold">{isPlaying ? 'Playing' : 'Paused'}</p>
        </div>
        <div>
          <p className="text-purple-200 text-sm">Progress</p>
          <p className="font-semibold">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;