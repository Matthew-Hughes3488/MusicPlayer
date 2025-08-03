import { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Repeat, 
  Shuffle,
  Heart,
  MoreHorizontal,
  Maximize2,
  Music
} from 'lucide-react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer.jsx';
import { useDummyData } from '../../hooks/useDummyData.js';
import { formatDuration } from '../../utils/formatters.js';

export const PlayerControls = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    shuffle,
    repeat,
    togglePlayPause,
    skipToNext,
    skipToPrevious,
    seekTo,
    changeVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat
  } = useAudioPlayer();

  const { isTrackLiked, toggleLikeTrack } = useDummyData();
  const [isDragging, setIsDragging] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [localTime, setLocalTime] = useState(currentTime);

  // Update local time when not dragging
  useEffect(() => {
    if (!isDragging) {
      setLocalTime(currentTime);
    }
  }, [currentTime, isDragging]);

  // Handle progress bar drag
  const handleProgressChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const newTime = percentage * duration;
    setLocalTime(newTime);
    if (!isDragging) {
      seekTo(newTime);
    }
  };

  const handleProgressMouseDown = (e) => {
    setIsDragging(true);
    handleProgressChange(e);
    
    const handleMouseMove = (e) => {
      handleProgressChange(e);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      seekTo(localTime);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(1, percentage));
    changeVolume(newVolume);
  };

  const handleLikeToggle = () => {
    if (currentTrack) {
      toggleLikeTrack(currentTrack.id);
    }
  };

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-dark-800/95 backdrop-blur border-t border-white/10 p-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-4 text-dark-400">
            <Music className="h-8 w-8" />
            <div>
              <p className="text-white font-medium">No track selected</p>
              <p className="text-sm">Choose a song to start playing</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progress = duration > 0 ? (localTime / duration) * 100 : 0;
  const volumePercentage = volume * 100;
  const isLiked = isTrackLiked(currentTrack.id);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-800/95 backdrop-blur border-t border-white/10 z-40">
      {/* Progress bar */}
      <div className="w-full h-1 bg-dark-700 cursor-pointer" onClick={handleProgressChange}>
        <div 
          className="h-full bg-primary-500 transition-all duration-100 relative"
          style={{ width: `${progress}%` }}
        >
          <div 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
            onMouseDown={handleProgressMouseDown}
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4">
        {/* Track info */}
        <div className="flex items-center space-x-4 min-w-0 w-1/4">
          <div className="h-14 w-14 bg-dark-700 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={currentTrack.cover_image_url}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0yOCAzNVY0MS41NUM0MS40IDM0LjggNDAuNzMgMzUgNDAgMzVDMzcuNzkgMzUgMzYgMzYuNzkgMzYgMzlTMzcuNzkgNDMgNDAgNDNTNDQgNDEuMjEgNDQgMzlWMjlINDhWMjVINDRWMzVaIiBmaWxsPSIjNjM2Nzc4Ii8+Cjwvc3ZnPgo=';
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-medium truncate">{currentTrack.title}</h4>
            <p className="text-dark-300 text-sm truncate">{currentTrack.artist}</p>
          </div>
          <button
            onClick={handleLikeToggle}
            className={`p-2 rounded-lg transition-colors ${
              isLiked 
                ? 'text-red-500 hover:text-red-400' 
                : 'text-dark-400 hover:text-white'
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Main controls */}
        <div className="flex flex-col items-center space-y-3 flex-1 max-w-md">
          {/* Control buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleShuffle}
              className={`p-2 rounded-lg transition-colors ${
                shuffle 
                  ? 'text-primary-400 bg-primary-500/20' 
                  : 'text-dark-400 hover:text-white'
              }`}
              title={shuffle ? 'Disable shuffle' : 'Enable shuffle'}
            >
              <Shuffle className="h-4 w-4" />
            </button>

            <button
              onClick={skipToPrevious}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              title="Previous track"
            >
              <SkipBack className="h-5 w-5" />
            </button>

            <button
              onClick={togglePlayPause}
              className="bg-white text-dark-900 p-3 rounded-full hover:scale-105 transition-transform"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" />
              )}
            </button>

            <button
              onClick={skipToNext}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              title="Next track"
            >
              <SkipForward className="h-5 w-5" />
            </button>

            <button
              onClick={toggleRepeat}
              className={`p-2 rounded-lg transition-colors ${
                repeat !== 'off'
                  ? 'text-primary-400 bg-primary-500/20' 
                  : 'text-dark-400 hover:text-white'
              }`}
              title={`Repeat: ${repeat}`}
            >
              <Repeat className="h-4 w-4" />
              {repeat === 'one' && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  1
                </span>
              )}
            </button>
          </div>

          {/* Time display */}
          <div className="flex items-center space-x-4 text-sm text-dark-300 w-full">
            <span className="w-12 text-right">{formatDuration(localTime)}</span>
            <div className="flex-1" />
            <span className="w-12">{formatDuration(duration)}</span>
          </div>
        </div>

        {/* Volume and additional controls */}
        <div className="flex items-center space-x-4 w-1/4 justify-end">
          <button className="p-2 rounded-lg text-dark-400 hover:text-white transition-colors hidden lg:block">
            <MoreHorizontal className="h-5 w-5" />
          </button>

          <div 
            className="relative flex items-center space-x-2"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <button
              onClick={toggleMute}
              className="p-2 rounded-lg text-dark-400 hover:text-white transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>

            {/* Volume slider */}
            <div className={`
              hidden lg:flex items-center transition-all duration-200
              ${showVolumeSlider ? 'w-24 opacity-100' : 'w-0 opacity-0'}
            `}>
              <div 
                className="w-full h-1 bg-dark-600 rounded-full cursor-pointer"
                onClick={handleVolumeChange}
              >
                <div 
                  className="h-full bg-white rounded-full relative"
                  style={{ width: `${volumePercentage}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>

          <button className="p-2 rounded-lg text-dark-400 hover:text-white transition-colors hidden lg:block">
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};