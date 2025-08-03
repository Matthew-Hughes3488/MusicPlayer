import { dummyTracks } from '../data/dummyTracks.js';
import { dummyPlaylists } from '../data/dummyPlaylists.js';
import { dummyUser } from '../data/dummyUser.js';

export const useDummyData = () => {
  const getTracks = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(dummyTracks), 500);
    });
  };

  const getPlaylists = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(dummyPlaylists), 300);
    });
  };

  const getUser = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(dummyUser), 200);
    });
  };

  const getTrackById = (id) => {
    return new Promise((resolve) => {
      const track = dummyTracks.find(track => track.id === id);
      setTimeout(() => resolve(track), 100);
    });
  };

  const getPlaylistById = (id) => {
    return new Promise((resolve) => {
      const playlist = dummyPlaylists.find(playlist => playlist.id === id);
      setTimeout(() => resolve(playlist), 100);
    });
  };

  const getTracksByIds = (ids) => {
    return new Promise((resolve) => {
      const tracks = dummyTracks.filter(track => ids.includes(track.id));
      setTimeout(() => resolve(tracks), 200);
    });
  };

  const searchTracks = (query) => {
    return new Promise((resolve) => {
      const filteredTracks = dummyTracks.filter(track => 
        track.title.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase()) ||
        track.album.toLowerCase().includes(query.toLowerCase())
      );
      setTimeout(() => resolve(filteredTracks), 400);
    });
  };

  const addToPlaylist = (playlistId, trackId) => {
    return new Promise((resolve) => {
      console.log(`Adding track ${trackId} to playlist ${playlistId}`);
      setTimeout(() => resolve({ success: true }), 200);
    });
  };

  const removeFromPlaylist = (playlistId, trackId) => {
    return new Promise((resolve) => {
      console.log(`Removing track ${trackId} from playlist ${playlistId}`);
      setTimeout(() => resolve({ success: true }), 200);
    });
  };

  const createPlaylist = (name, description) => {
    return new Promise((resolve) => {
      const newPlaylist = {
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