import { useState, useEffect, useCallback, useMemo } from 'react';
import { dummyTracks, searchTracks as searchTracksUtil } from '../data/dummyTracks.js';
import { dummyPlaylists, getPlaylistById, createPlaylist as createPlaylistUtil } from '../data/dummyPlaylists.js';
import { dummyUser, mockUserPreferences } from '../data/dummyUser.js';

// Custom hook for managing dummy data and simulating API calls
export const useDummyData = () => {
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize data on mount
  useEffect(() => {
    const initializeData = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        setTracks(dummyTracks);
        setPlaylists(dummyPlaylists);
        setUser(dummyUser);
        
        // Load user preferences from localStorage
        mockUserPreferences.loadPreferences();
        
        setLoading(false);
      }, 500);
    };

    initializeData();
  }, []);

  // Track management functions
  const getAllTracks = useCallback(() => {
    return tracks;
  }, [tracks]);

  const getTrackById = useCallback((id) => {
    return tracks.find(track => track.id === id);
  }, [tracks]);

  const searchTracks = useCallback((query) => {
    if (!query.trim()) return tracks;
    return searchTracksUtil(query);
  }, [tracks]);

  const getTracksByGenre = useCallback((genre) => {
    return tracks.filter(track => 
      track.genre.toLowerCase() === genre.toLowerCase()
    );
  }, [tracks]);

  const getTracksByArtist = useCallback((artist) => {
    return tracks.filter(track => 
      track.artist.toLowerCase().includes(artist.toLowerCase())
    );
  }, [tracks]);

  // Simulate adding a new track (mock upload)
  const addTrack = useCallback(async (trackData) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newTrack = {
        id: Math.max(...tracks.map(t => t.id)) + 1,
        ...trackData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        cover_image_url: trackData.cover_image_url || `https://picsum.photos/300/300?random=${Date.now()}`
      };

      setTracks(prev => [...prev, newTrack]);
      setLoading(false);
      
      return { success: true, track: newTrack };
    } catch (err) {
      setError('Failed to add track');
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, [tracks]);

  // Simulate updating a track
  const updateTrack = useCallback(async (trackId, updateData) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setTracks(prev => prev.map(track => 
        track.id === trackId 
          ? { ...track, ...updateData, updated_at: new Date().toISOString() }
          : track
      ));

      setLoading(false);
      return { success: true };
    } catch (err) {
      setError('Failed to update track');
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, []);

  // Simulate deleting a track
  const deleteTrack = useCallback(async (trackId) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setTracks(prev => prev.filter(track => track.id !== trackId));
      
      // Also remove from all playlists
      setPlaylists(prev => prev.map(playlist => ({
        ...playlist,
        tracks: playlist.tracks.filter(track => track.id !== trackId),
        updated_at: new Date().toISOString()
      })));

      setLoading(false);
      return { success: true };
    } catch (err) {
      setError('Failed to delete track');
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, []);

  // Playlist management functions
  const getAllPlaylists = useCallback(() => {
    return playlists;
  }, [playlists]);

  const getPlaylistByIdHook = useCallback((id) => {
    return playlists.find(playlist => playlist.id === id);
  }, [playlists]);

  const createPlaylist = useCallback(async (name, description = "") => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newPlaylist = createPlaylistUtil(name, description);
      setPlaylists(prev => [...prev, newPlaylist]);
      
      setLoading(false);
      return { success: true, playlist: newPlaylist };
    } catch (err) {
      setError('Failed to create playlist');
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, []);

  const updatePlaylist = useCallback(async (playlistId, updateData) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setPlaylists(prev => prev.map(playlist => 
        playlist.id === playlistId
          ? { ...playlist, ...updateData, updated_at: new Date().toISOString() }
          : playlist
      ));

      setLoading(false);
      return { success: true };
    } catch (err) {
      setError('Failed to update playlist');
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, []);

  const deletePlaylist = useCallback(async (playlistId) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setPlaylists(prev => prev.filter(playlist => playlist.id !== playlistId));
      
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError('Failed to delete playlist');
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, []);

  const addTrackToPlaylist = useCallback(async (playlistId, trackId) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const track = tracks.find(t => t.id === trackId);
      if (!track) {
        throw new Error('Track not found');
      }

      setPlaylists(prev => prev.map(playlist => {
        if (playlist.id === playlistId) {
          const isAlreadyInPlaylist = playlist.tracks.some(t => t.id === trackId);
          if (isAlreadyInPlaylist) {
            throw new Error('Track already in playlist');
          }
          
          return {
            ...playlist,
            tracks: [...playlist.tracks, track],
            updated_at: new Date().toISOString()
          };
        }
        return playlist;
      }));

      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, [tracks]);

  const removeTrackFromPlaylist = useCallback(async (playlistId, trackId) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      setPlaylists(prev => prev.map(playlist => 
        playlist.id === playlistId
          ? {
              ...playlist,
              tracks: playlist.tracks.filter(track => track.id !== trackId),
              updated_at: new Date().toISOString()
            }
          : playlist
      ));

      setLoading(false);
      return { success: true };
    } catch (err) {
      setError('Failed to remove track from playlist');
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, []);

  // User preference functions
  const updateUserPreferences = useCallback((newPreferences) => {
    const updated = mockUserPreferences.updatePreferences(newPreferences);
    setUser(prev => ({
      ...prev,
      preferences: updated
    }));
    return updated;
  }, []);

  // Get liked tracks (from Liked Songs playlist)
  const getLikedTracks = useCallback(() => {
    const likedPlaylist = playlists.find(p => p.isLikedSongs);
    return likedPlaylist ? likedPlaylist.tracks : [];
  }, [playlists]);

  // Toggle like for a track
  const toggleLikeTrack = useCallback(async (trackId) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const likedPlaylistIndex = playlists.findIndex(p => p.isLikedSongs);
      if (likedPlaylistIndex === -1) {
        throw new Error('Liked Songs playlist not found');
      }

      const track = tracks.find(t => t.id === trackId);
      if (!track) {
        throw new Error('Track not found');
      }

      setPlaylists(prev => {
        const newPlaylists = [...prev];
        const likedPlaylist = newPlaylists[likedPlaylistIndex];
        const isLiked = likedPlaylist.tracks.some(t => t.id === trackId);

        if (isLiked) {
          // Remove from liked
          likedPlaylist.tracks = likedPlaylist.tracks.filter(t => t.id !== trackId);
        } else {
          // Add to liked
          likedPlaylist.tracks.push(track);
        }

        likedPlaylist.updated_at = new Date().toISOString();
        return newPlaylists;
      });

      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, [tracks, playlists]);

  // Check if track is liked
  const isTrackLiked = useCallback((trackId) => {
    const likedPlaylist = playlists.find(p => p.isLikedSongs);
    return likedPlaylist ? likedPlaylist.tracks.some(t => t.id === trackId) : false;
  }, [playlists]);

  // Get recently played tracks
  const getRecentlyPlayed = useCallback(() => {
    const recentPlaylist = playlists.find(p => p.isRecentlyPlayed);
    return recentPlaylist ? recentPlaylist.tracks : [];
  }, [playlists]);

  // Add track to recently played
  const addToRecentlyPlayed = useCallback((trackId) => {
    const track = tracks.find(t => t.id === trackId);
    if (!track) return;

    setPlaylists(prev => prev.map(playlist => {
      if (playlist.isRecentlyPlayed) {
        // Remove track if already in recently played
        const filteredTracks = playlist.tracks.filter(t => t.id !== trackId);
        
        // Add to beginning and limit to 10 tracks
        return {
          ...playlist,
          tracks: [track, ...filteredTracks].slice(0, 10),
          updated_at: new Date().toISOString()
        };
      }
      return playlist;
    }));
  }, [tracks]);

  // Memoized derived data
  const stats = useMemo(() => {
    const totalTracks = tracks.length;
    const totalPlaylists = playlists.length;
    const totalDuration = tracks.reduce((sum, track) => sum + (track.duration || 0), 0);
    const genres = [...new Set(tracks.map(track => track.genre))];
    const artists = [...new Set(tracks.map(track => track.artist))];

    return {
      totalTracks,
      totalPlaylists,
      totalDuration,
      genreCount: genres.length,
      artistCount: artists.length,
      genres,
      artists
    };
  }, [tracks, playlists]);

  return {
    // Data
    tracks,
    playlists,
    user,
    stats,
    loading,
    error,

    // Track functions
    getAllTracks,
    getTrackById,
    searchTracks,
    getTracksByGenre,
    getTracksByArtist,
    addTrack,
    updateTrack,
    deleteTrack,

    // Playlist functions
    getAllPlaylists,
    getPlaylistById: getPlaylistByIdHook,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,

    // User functions
    updateUserPreferences,
    getLikedTracks,
    toggleLikeTrack,
    isTrackLiked,
    getRecentlyPlayed,
    addToRecentlyPlayed,

    // Utility
    setError
  };
};