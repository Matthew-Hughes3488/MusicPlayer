import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import type { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest,
  User, 
  Song, 
  SongInput, 
  Album, 
  AlbumInput 
} from '../types';

class ApiService {
  private authApi: AxiosInstance;
  private albumsApi: AxiosInstance;
  private songsApi: AxiosInstance;
  private usersApi: AxiosInstance;

  constructor() {
    // Initialize API clients for each microservice
    this.authApi = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.albumsApi = axios.create({
      baseURL: 'http://localhost:8001',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.songsApi = axios.create({
      baseURL: 'http://localhost:8002',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.usersApi = axios.create({
      baseURL: 'http://localhost:8003',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    [this.albumsApi, this.songsApi, this.usersApi].forEach(api => {
      api.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });
    });
  }

  // Auth API methods
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Demo mode - simulate login
    if (credentials.email.includes('@example.com')) {
      const userId = credentials.email === 'admin@example.com' ? 1 : 2;
      const role = credentials.email === 'admin@example.com' ? 'admin' : 'user';
      
      // Create a mock JWT token payload
      const mockPayload = {
        sub: userId.toString(),
        exp: Math.floor(Date.now() / 1000) + 3600,
        iat: Math.floor(Date.now() / 1000),
        role
      };
      
      // Create a simple mock JWT (not secure, just for demo)
      const mockToken = btoa(JSON.stringify({
        header: { alg: 'HS256', typ: 'JWT' },
        payload: mockPayload,
        signature: 'mock_signature'
      }));
      
      return {
        auth_token: `demo.${btoa(JSON.stringify(mockPayload))}.demo`,
        user_id: userId
      };
    }
    
    // Try real API call
    try {
      const response: AxiosResponse<LoginResponse> = await this.authApi.post('/login', credentials);
      return response.data;
    } catch (error) {
      // Fallback to demo mode if API fails
      const userId = 2;
      const mockPayload = {
        sub: userId.toString(),
        exp: Math.floor(Date.now() / 1000) + 3600,
        iat: Math.floor(Date.now() / 1000),
        role: 'user'
      };
      
      return {
        auth_token: `demo.${btoa(JSON.stringify(mockPayload))}.demo`,
        user_id: userId
      };
    }
  }

  async register(userData: RegisterRequest): Promise<LoginResponse> {
    // Demo mode - simulate registration
    const userId = Math.floor(Math.random() * 1000) + 10;
    const mockPayload = {
      sub: userId.toString(),
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
      role: userData.role || 'user'
    };
    
    try {
      const response: AxiosResponse<LoginResponse> = await this.authApi.post('/register', userData);
      return response.data;
    } catch (error) {
      // Fallback to demo mode if API fails
      return {
        auth_token: `demo.${btoa(JSON.stringify(mockPayload))}.demo`,
        user_id: userId
      };
    }
  }

  // Users API methods
  async getUserById(userId: number): Promise<User> {
    const response: AxiosResponse<User> = await this.usersApi.get(`/users/${userId}`);
    return response.data;
  }

  async getAllUsers(): Promise<User[]> {
    const response: AxiosResponse<User[]> = await this.usersApi.get('/users');
    return response.data;
  }

  // Albums API methods
  async getAllAlbums(): Promise<Album[]> {
    const response: AxiosResponse<Album[]> = await this.albumsApi.get('/albums');
    return response.data;
  }

  async getAlbumById(albumId: number): Promise<Album> {
    const response: AxiosResponse<Album> = await this.albumsApi.get(`/albums/${albumId}`);
    return response.data;
  }

  async createAlbum(albumData: AlbumInput): Promise<Album> {
    const response: AxiosResponse<Album> = await this.albumsApi.post('/albums', albumData);
    return response.data;
  }

  async updateAlbum(albumId: number, albumData: Partial<AlbumInput>): Promise<Album> {
    const response: AxiosResponse<Album> = await this.albumsApi.put(`/albums/${albumId}`, albumData);
    return response.data;
  }

  async deleteAlbum(albumId: number): Promise<void> {
    await this.albumsApi.delete(`/albums/${albumId}`);
  }

  async getAlbumSongs(albumId: number): Promise<Song[]> {
    const response: AxiosResponse<Song[]> = await this.albumsApi.get(`/albums/${albumId}/songs`);
    return response.data;
  }

  // Songs API methods
  async getAllSongs(): Promise<Song[]> {
    const response: AxiosResponse<Song[]> = await this.songsApi.get('/songs');
    return response.data;
  }

  async getSongById(songId: number): Promise<Song> {
    const response: AxiosResponse<Song> = await this.songsApi.get(`/songs/${songId}`);
    return response.data;
  }

  async createSong(songData: SongInput): Promise<Song> {
    const response: AxiosResponse<Song> = await this.songsApi.post('/songs', songData);
    return response.data;
  }

  async updateSong(songId: number, songData: Partial<SongInput>): Promise<Song> {
    const response: AxiosResponse<Song> = await this.songsApi.put(`/songs/${songId}`, songData);
    return response.data;
  }

  async deleteSong(songId: number): Promise<void> {
    await this.songsApi.delete(`/songs/${songId}`);
  }

  // Search functionality
  async searchSongs(query: string): Promise<Song[]> {
    const songs = await this.getAllSongs();
    return songs.filter(song => 
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
    );
  }

  async searchAlbums(query: string): Promise<Album[]> {
    const albums = await this.getAllAlbums();
    return albums.filter(album => 
      album.title.toLowerCase().includes(query.toLowerCase()) ||
      album.artist.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export const apiService = new ApiService();