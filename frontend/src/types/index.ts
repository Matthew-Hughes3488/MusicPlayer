// User types
export interface User {
  user_id: number;
  email: string;
  role: 'admin' | 'user';
  created_at?: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role?: 'user';
}

export interface LoginResponse {
  auth_token: string;
  user_id: number;
}

export interface JWTPayload {
  sub: string; // user ID
  exp: number; // expiry timestamp
  iat: number; // issued at timestamp
  role: string; // user role
}

// Song types
export interface Song {
  song_id: number;
  title: string;
  artist: string;
  album_id: number;
  duration: number;
  genre?: string;
  file_url?: string;
}

export interface SongInput {
  title: string;
  artist: string;
  album_id: number;
  duration: number;
  genre?: string;
  file_url?: string;
}

// Album types
export interface Album {
  album_id: number;
  title: string;
  artist: string;
  release_date: string;
  genre?: string;
  cover_image?: string;
}

export interface AlbumInput {
  title: string;
  artist: string;
  release_date: string;
  genre?: string;
  cover_image?: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Auth context type
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}