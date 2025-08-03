import { useState, useEffect, useCallback, useRef } from 'react';
import { audioManager } from '../utils/audioUtils.js';

// Custom hook for audio player functionality
export const useAudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('off'); // 'off', 'one', 'all'
  const [progress, setProgress] = useState(0);

  // Refs for managing state
  const audioStateRef = useRef({
    isPlaying: false,
    currentTrack: null,
    currentIndex: 0
  });

  // Update ref when state changes
  useEffect(() => {
    audioStateRef.current = {
      isPlaying,
      currentTrack,
      currentIndex
    };
  }, [isPlaying, currentTrack, currentIndex]);

  // Audio event handlers
  const handleTimeUpdate = useCallback(() => {
    const state = audioManager.getState();
    setCurrentTime(state.currentTime);
    setProgress(state.progress);
  }, []);

  const handleLoadedData = useCallback(() => {
    const state = audioManager.getState();
    setDuration(state.duration);
    setIsLoading(false);
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    setError(null);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    
    // Handle repeat modes
    if (repeat === 'one') {
      // Replay current track
      playTrack(audioStateRef.current.currentTrack);
    } else if (repeat === 'all' || audioStateRef.current.currentIndex < queue.length - 1) {
      // Play next track
      skipToNext();
    }
  }, [repeat, queue.length]);

  const handleError = useCallback((error) => {
    setError('Failed to load audio track');
    setIsLoading(false);
    setIsPlaying(false);
  }, []);

  const handleVolumeChange = useCallback(() => {
    const state = audioManager.getState();
    setVolume(state.volume);
    setIsMuted(state.isMuted);
  }, []);

  // Setup audio manager event listeners
  useEffect(() => {
    audioManager.addEventListener('timeupdate', handleTimeUpdate);
    audioManager.addEventListener('loadeddata', handleLoadedData);
    audioManager.addEventListener('play', handlePlay);
    audioManager.addEventListener('pause', handlePause);
    audioManager.addEventListener('ended', handleEnded);
    audioManager.addEventListener('error', handleError);
    audioManager.addEventListener('volumechange', handleVolumeChange);

    // Initialize volume
    audioManager.setVolume(volume);

    return () => {
      audioManager.removeEventListener('timeupdate', handleTimeUpdate);
      audioManager.removeEventListener('loadeddata', handleLoadedData);
      audioManager.removeEventListener('play', handlePlay);
      audioManager.removeEventListener('pause', handlePause);
      audioManager.removeEventListener('ended', handleEnded);
      audioManager.removeEventListener('error', handleError);
      audioManager.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [
    handleTimeUpdate,
    handleLoadedData,
    handlePlay,
    handlePause,
    handleEnded,
    handleError,
    handleVolumeChange
  ]);

  // Play a specific track
  const playTrack = useCallback(async (track, startFromQueue = false) => {
    if (!track) return;

    setIsLoading(true);
    setError(null);

    try {
      await audioManager.loadTrack(track.file_url);
      setCurrentTrack(track);
      
      if (!startFromQueue) {
        // If not starting from queue, find the track in current queue or add it
        const trackIndex = queue.findIndex(t => t.id === track.id);
        if (trackIndex !== -1) {
          setCurrentIndex(trackIndex);
        } else {
          // Add track to queue if not found
          setQueue(prev => [...prev, track]);
          setCurrentIndex(queue.length);
        }
      }

      await audioManager.play();
    } catch (err) {
      setError('Failed to play track');
      setIsLoading(false);
    }
  }, [queue]);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (currentTrack) {
      audioManager.togglePlayPause();
    }
  }, [currentTrack]);

  // Seek to specific time
  const seekTo = useCallback((time) => {
    audioManager.seekTo(time);
  }, []);

  // Set volume (0-1)
  const changeVolume = useCallback((newVolume) => {
    audioManager.setVolume(newVolume);
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    audioManager.toggleMute();
  }, []);

  // Skip to next track
  const skipToNext = useCallback(() => {
    if (queue.length === 0) return;

    let nextIndex;
    
    if (shuffle) {
      // Random next track (excluding current)
      const availableIndices = queue.map((_, i) => i).filter(i => i !== currentIndex);
      nextIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    } else {
      nextIndex = currentIndex + 1;
      if (nextIndex >= queue.length) {
        if (repeat === 'all') {
          nextIndex = 0;
        } else {
          return; // No more tracks
        }
      }
    }

    setCurrentIndex(nextIndex);
    playTrack(queue[nextIndex], true);
  }, [queue, currentIndex, shuffle, repeat, playTrack]);

  // Skip to previous track
  const skipToPrevious = useCallback(() => {
    if (queue.length === 0) return;

    // If more than 3 seconds into track, restart current track
    if (currentTime > 3) {
      seekTo(0);
      return;
    }

    let prevIndex;
    
    if (shuffle) {
      // Random previous track (excluding current)
      const availableIndices = queue.map((_, i) => i).filter(i => i !== currentIndex);
      prevIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    } else {
      prevIndex = currentIndex - 1;
      if (prevIndex < 0) {
        if (repeat === 'all') {
          prevIndex = queue.length - 1;
        } else {
          return; // No previous tracks
        }
      }
    }

    setCurrentIndex(prevIndex);
    playTrack(queue[prevIndex], true);
  }, [queue, currentIndex, currentTime, shuffle, repeat, playTrack, seekTo]);

  // Add track to queue
  const addToQueue = useCallback((track) => {
    setQueue(prev => [...prev, track]);
  }, []);

  // Add multiple tracks to queue
  const addTracksToQueue = useCallback((tracks) => {
    setQueue(prev => [...prev, ...tracks]);
  }, []);

  // Remove track from queue
  const removeFromQueue = useCallback((index) => {
    setQueue(prev => {
      const newQueue = prev.filter((_, i) => i !== index);
      
      // Adjust current index if necessary
      if (index < currentIndex) {
        setCurrentIndex(prev => prev - 1);
      } else if (index === currentIndex && newQueue.length > 0) {
        // If current track was removed, play the track at the same index or the last track
        const newIndex = Math.min(currentIndex, newQueue.length - 1);
        setCurrentIndex(newIndex);
        if (newQueue[newIndex]) {
          playTrack(newQueue[newIndex], true);
        }
      }
      
      return newQueue;
    });
  }, [currentIndex, playTrack]);

  // Clear queue
  const clearQueue = useCallback(() => {
    setQueue([]);
    setCurrentIndex(0);
  }, []);

  // Set queue and play first track
  const playQueue = useCallback((tracks, startIndex = 0) => {
    setQueue(tracks);
    setCurrentIndex(startIndex);
    if (tracks[startIndex]) {
      playTrack(tracks[startIndex], true);
    }
  }, [playTrack]);

  // Toggle shuffle
  const toggleShuffle = useCallback(() => {
    setShuffle(prev => !prev);
  }, []);

  // Cycle repeat mode
  const toggleRepeat = useCallback(() => {
    setRepeat(prev => {
      switch (prev) {
        case 'off': return 'all';
        case 'all': return 'one';
        case 'one': return 'off';
        default: return 'off';
      }
    });
  }, []);

  return {
    // Current state
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isLoading,
    error,
    progress,
    queue,
    currentIndex,
    shuffle,
    repeat,
    
    // Control functions
    playTrack,
    togglePlayPause,
    seekTo,
    changeVolume,
    toggleMute,
    skipToNext,
    skipToPrevious,
    
    // Queue management
    addToQueue,
    addTracksToQueue,
    removeFromQueue,
    clearQueue,
    playQueue,
    
    // Settings
    toggleShuffle,
    toggleRepeat,
    
    // Utilities
    setError
  };
};