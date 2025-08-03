// Type definitions for the music player application

export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  url: string;
  coverArt: string;
  genre: string;
  year: number;
  liked: boolean;
}

export interface Playlist {
  id: number;
  name: string;
  description: string;
  trackIds: number[];
  coverArt: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  isPremium: boolean;
  joinedAt: string;
  preferences: {
    theme: 'light' | 'dark';
    autoplay: boolean;
    shuffle: boolean;
    repeat: 'off' | 'one' | 'all';
    volume: number;
    quality: 'low' | 'medium' | 'high';
  };
  stats: {
    totalListeningTime: string;
    favoriteGenre: string;
    tracksPlayed: number;
    playlistsCreated: number;
  };
}

export interface AuthResult {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export interface FileUploadItem {
  id: number;
  file: File;
  name: string;
  size: number;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
}