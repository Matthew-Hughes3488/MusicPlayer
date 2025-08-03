// Audio utility functions for the music player

export const formatTime = (seconds: number): string => {
  if (!seconds || seconds === 0) return "0:00";
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const parseTimeToSeconds = (timeString: string): number => {
  if (!timeString) return 0;
  
  const parts = timeString.split(':').map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return 0;
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getNextTrack = (currentIndex: number, playlist: any[], isShuffled: boolean, shuffledIndices: number[]): number => {
  if (isShuffled && shuffledIndices) {
    const currentShuffledIndex = shuffledIndices.indexOf(currentIndex);
    const nextShuffledIndex = (currentShuffledIndex + 1) % shuffledIndices.length;
    return shuffledIndices[nextShuffledIndex];
  }
  return (currentIndex + 1) % playlist.length;
};

export const getPreviousTrack = (currentIndex: number, playlist: any[], isShuffled: boolean, shuffledIndices: number[]): number => {
  if (isShuffled && shuffledIndices) {
    const currentShuffledIndex = shuffledIndices.indexOf(currentIndex);
    const prevShuffledIndex = currentShuffledIndex === 0 
      ? shuffledIndices.length - 1 
      : currentShuffledIndex - 1;
    return shuffledIndices[prevShuffledIndex];
  }
  return currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
};

export const createAudioContext = (): AudioContext | null => {
  if (typeof window !== 'undefined' && window.AudioContext) {
    return new window.AudioContext();
  }
  return null;
};

export const loadAudioFile = async (url: string): Promise<ArrayBuffer> => {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
  } catch (error) {
    console.error('Error loading audio file:', error);
    throw error;
  }
};