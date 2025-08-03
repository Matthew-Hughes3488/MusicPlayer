import { dummyTracks } from '../data/dummyTracks.js';
import { dummyPlaylists } from '../data/dummyPlaylists.js';
import { dummyUser } from '../data/dummyUser.js';
import type { Track, Playlist, User } from '../types/index.js';

export const useDummyData = () => {
  const getTracks = (): Promise<Track[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(dummyTracks), 500);
    });
  };

  const getPlaylists = (): Promise<Playlist[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(dummyPlaylists), 300);
    });
  };

  const getUser = (): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(dummyUser), 200);
    });
  };

  const getTrackById = (id: number): Promise<Track | undefined> => {
    return new Promise((resolve) => {
      const track = dummyTracks.find(track => track.id === id);
      setTimeout(() => resolve(track), 100);
    });
  };

  const getPlaylistById = (id: number): Promise<Playlist | undefined> => {
    return new Promise((resolve) => {
      const playlist = dummyPlaylists.find(playlist => playlist.id === id);
      setTimeout(() => resolve(playlist), 100);
    });
  };

  const getTracksByIds = (ids: number[]): Promise<Track[]> => {
    return new Promise((resolve) => {
      const tracks = dummyTracks.filter(track => ids.includes(track.id));
      setTimeout(() => resolve(tracks), 200);
    });
  };

  const searchTracks = (query: string): Promise<Track[]> => {
    return new Promise((resolve) => {
      const filteredTracks = dummyTracks.filter(track => 
        track.title.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase()) ||
        track.album.toLowerCase().includes(query.toLowerCase())
      );
      setTimeout(() => resolve(filteredTracks), 400);
    });
  };

  const addToPlaylist = (playlistId: number, trackId: number): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      console.log(`Adding track ${trackId} to playlist ${playlistId}`);
      setTimeout(() => resolve({ success: true }), 200);
    });
  };

  const removeFromPlaylist = (playlistId: number, trackId: number): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      console.log(`Removing track ${trackId} from playlist ${playlistId}`);
      setTimeout(() => resolve({ success: true }), 200);
    });
  };

  const createPlaylist = (name: string, description: string): Promise<Playlist> => {
    return new Promise((resolve) => {
      const newPlaylist: Playlist = {
        id: Date.now(),
        name,
        description,
        trackIds: [],
        coverArt: "https://via.placeholder.com/300x300/6B7280/ffffff?text=New",
        isPublic: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setTimeout(() => resolve(newPlaylist), 300);
    });
  };

  return {
    getTracks,
    getPlaylists,
    getUser,
    getTrackById,
    getPlaylistById,
    getTracksByIds,
    searchTracks,
    addToPlaylist,
    removeFromPlaylist,
    createPlaylist
  };
};