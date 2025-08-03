import { dummyTracks } from './dummyTracks.js';

// Dummy playlists data based on backend requirements
export const dummyPlaylists = [
  {
    id: 1,
    name: "Liked Songs",
    description: "Your favorite tracks",
    cover_image_url: "https://picsum.photos/300/300?random=100",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    tracks: [
      dummyTracks[0], // Bohemian Rhapsody
      dummyTracks[1], // Imagine
      dummyTracks[3], // Billie Jean
      dummyTracks[6], // Stairway to Heaven
      dummyTracks[13], // A Day in the Life
      dummyTracks[18], // God Only Knows
      dummyTracks[22], // Hallelujah
    ],
    isLikedSongs: true
  },
  {
    id: 2,
    name: "Recently Played",
    description: "Your recent listening history",
    cover_image_url: "https://picsum.photos/300/300?random=101",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T12:00:00Z",
    tracks: [
      dummyTracks[20], // Smells Like Teen Spirit
      dummyTracks[21], // Lose Yourself
      dummyTracks[24], // Wonderwall
      dummyTracks[26], // Creep
      dummyTracks[4], // Sweet Child O' Mine
    ],
    isRecentlyPlayed: true
  },
  {
    id: 3,
    name: "Rock Classics",
    description: "The greatest rock songs of all time",
    cover_image_url: "https://picsum.photos/300/300?random=102",
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
    tracks: [
      dummyTracks[0], // Bohemian Rhapsody
      dummyTracks[2], // Hotel California
      dummyTracks[4], // Sweet Child O' Mine
      dummyTracks[6], // Stairway to Heaven
      dummyTracks[7], // Purple Haze
      dummyTracks[12], // Born to Run
      dummyTracks[16], // Light My Fire
      dummyTracks[19], // Layla
    ]
  },
  {
    id: 4,
    name: "90s Nostalgia",
    description: "The best hits from the 1990s",
    cover_image_url: "https://picsum.photos/300/300?random=103",
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z",
    tracks: [
      dummyTracks[20], // Smells Like Teen Spirit
      dummyTracks[24], // Wonderwall
      dummyTracks[25], // Black
      dummyTracks[26], // Creep
      dummyTracks[23], // Paranoid Android
    ]
  },
  {
    id: 5,
    name: "Chill Vibes",
    description: "Relaxing songs for any time of day",
    cover_image_url: "https://picsum.photos/300/300?random=104",
    created_at: "2024-01-08T00:00:00Z",
    updated_at: "2024-01-08T00:00:00Z",
    tracks: [
      dummyTracks[1], // Imagine
      dummyTracks[14], // The Sound of Silence
      dummyTracks[18], // God Only Knows
      dummyTracks[22], // Hallelujah
      dummyTracks[27], // Hurt
      dummyTracks[28], // Mad World
      dummyTracks[29], // Clair de Lune
    ]
  }
];

// Helper function to get playlist by ID
export const getPlaylistById = (id) => {
  return dummyPlaylists.find(playlist => playlist.id === id);
};

// Helper function to get tracks from a playlist
export const getPlaylistTracks = (playlistId) => {
  const playlist = getPlaylistById(playlistId);
  return playlist ? playlist.tracks : [];
};

// Helper function to add track to playlist (mock)
export const addTrackToPlaylist = (playlistId, trackId) => {
  const playlist = getPlaylistById(playlistId);
  const track = dummyTracks.find(t => t.id === trackId);
  
  if (playlist && track) {
    // Check if track is already in playlist
    const isAlreadyInPlaylist = playlist.tracks.some(t => t.id === trackId);
    if (!isAlreadyInPlaylist) {
      playlist.tracks.push(track);
      playlist.updated_at = new Date().toISOString();
      return true;
    }
  }
  return false;
};

// Helper function to remove track from playlist (mock)
export const removeTrackFromPlaylist = (playlistId, trackId) => {
  const playlist = getPlaylistById(playlistId);
  
  if (playlist) {
    const trackIndex = playlist.tracks.findIndex(t => t.id === trackId);
    if (trackIndex > -1) {
      playlist.tracks.splice(trackIndex, 1);
      playlist.updated_at = new Date().toISOString();
      return true;
    }
  }
  return false;
};

// Helper function to create new playlist (mock)
export const createPlaylist = (name, description = "") => {
  const newPlaylist = {
    id: dummyPlaylists.length + 1,
    name,
    description,
    cover_image_url: `https://picsum.photos/300/300?random=${100 + dummyPlaylists.length}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tracks: []
  };
  
  dummyPlaylists.push(newPlaylist);
  return newPlaylist;
};