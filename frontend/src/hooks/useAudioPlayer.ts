import { useState, useEffect, useRef, useCallback } from 'react';
import { formatTime, getNextTrack, getPreviousTrack, shuffleArray } from '../utils/audioUtils.js';
import type { Track } from '../types/index.js';

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.7);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [previousVolume, setPreviousVolume] = useState<number>(0.7);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = 'anonymous';
    }

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
        return;
      }

      if (repeatMode === 'all' || currentIndex < playlist.length - 1) {
        playNext();
      } else {
        setIsPlaying(false);
      }
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleError = (e) => {
      console.error('Audio error:', e);
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [currentIndex, playlist.length, repeatMode]);

  // Update audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const loadTrack = useCallback((track: Track) => {
    if (!track || !audioRef.current) return;

    audioRef.current.src = track.url;
    setCurrentTrack(track);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const play = useCallback(async () => {
    if (!audioRef.current || !currentTrack) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  }, [currentTrack]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const setPlaylistTracks = useCallback((tracks: Track[], startIndex: number = 0) => {
    setPlaylist(tracks);
    setCurrentIndex(startIndex);
    
    if (tracks.length > 0 && tracks[startIndex]) {
      loadTrack(tracks[startIndex]);
    }

    // Generate shuffled indices
    if (tracks.length > 0) {
      const indices = Array.from({ length: tracks.length }, (_, i) => i);
      setShuffledIndices(shuffleArray(indices));
    }
  }, [loadTrack]);

  const playTrack = useCallback((track: Track, newPlaylist?: Track[], index: number = 0) => {
    if (newPlaylist) {
      setPlaylist(newPlaylist);
      setCurrentIndex(index);
      loadTrack(track);
    } else {
      const trackIndex = playlist.findIndex(t => t.id === track.id);
      if (trackIndex !== -1) {
        setCurrentIndex(trackIndex);
        loadTrack(track);
      }
    }
  }, [playlist, loadTrack]);

  const playNext = useCallback(() => {
    if (playlist.length === 0) return;

    const nextIndex = getNextTrack(currentIndex, playlist, isShuffled, shuffledIndices);
    setCurrentIndex(nextIndex);
    loadTrack(playlist[nextIndex]);
  }, [currentIndex, playlist, isShuffled, shuffledIndices, loadTrack]);

  const playPrevious = useCallback(() => {
    if (playlist.length === 0) return;

    const prevIndex = getPreviousTrack(currentIndex, playlist, isShuffled, shuffledIndices);
    setCurrentIndex(prevIndex);
    loadTrack(playlist[prevIndex]);
  }, [currentIndex, playlist, isShuffled, shuffledIndices, loadTrack]);

  const toggleShuffle = useCallback(() => {
    setIsShuffled(prev => !prev);
    
    if (!isShuffled && playlist.length > 0) {
      const indices = Array.from({ length: playlist.length }, (_, i) => i);
      setShuffledIndices(shuffleArray(indices));
    }
  }, [isShuffled, playlist.length]);

  const toggleRepeat = useCallback(() => {
    setRepeatMode(prev => {
      switch (prev) {
        case 'off': return 'all';
        case 'all': return 'one';
        case 'one': return 'off';
        default: return 'off';
      }
    });
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
    }
  }, [isMuted, volume, previousVolume]);

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  return {
    // State
    currentTrack,
    playlist,
    currentIndex,
    isPlaying,
    volume,
    currentTime,
    duration,
    isLoading,
    isShuffled,
    repeatMode,
    isMuted,
    
    // Computed values
    formattedCurrentTime: formatTime(currentTime),
    formattedDuration: formatTime(duration),
    progress: duration > 0 ? (currentTime / duration) * 100 : 0,
    
    // Actions
    play,
    pause,
    togglePlayPause,
    seek,
    setPlaylist: setPlaylistTracks,
    playTrack,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleRepeat,
    toggleMute,
    changeVolume
  };
};