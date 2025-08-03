// Dummy user data based on backend User model
export const dummyUser = {
  id: 1,
  username: "Matthew",
  email: "matthew@example.com",
  first_name: "Matthew",
  last_name: "Hughes",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  profile_image_url: "https://picsum.photos/200/200?random=999",
  // Mock preferences
  preferences: {
    theme: "dark",
    volume: 0.7,
    autoplay: true,
    shuffle: false,
    repeat: "off", // off, one, all
    notifications: true,
    high_quality_audio: true
  },
  // Mock stats
  stats: {
    total_listening_time: 15420, // in minutes
    favorite_genre: "Rock",
    total_tracks_played: 1247,
    playlists_created: 8,
    tracks_liked: 156
  }
};

// Mock authentication functions
export const mockAuth = {
  // Mock login function - accepts any email/password
  login: async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation - accept any non-empty credentials
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    
    // Generate mock JWT token
    const mockToken = btoa(JSON.stringify({
      user_id: dummyUser.id,
      username: dummyUser.username,
      email: dummyUser.email,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));
    
    return {
      token: mockToken,
      user: dummyUser,
      message: "Login successful"
    };
  },

  // Mock token validation
  validateToken: (token) => {
    try {
      const payload = JSON.parse(atob(token));
      return payload.exp > Date.now();
    } catch {
      return false;
    }
  },

  // Mock user data from token
  getUserFromToken: (token) => {
    try {
      const payload = JSON.parse(atob(token));
      if (payload.exp > Date.now()) {
        return {
          id: payload.user_id,
          username: payload.username,
          email: payload.email
        };
      }
    } catch {
      return null;
    }
    return null;
  },

  // Mock logout
  logout: () => {
    localStorage.removeItem('music_player_token');
    localStorage.removeItem('music_player_user');
  }
};

// Mock user preferences functions
export const mockUserPreferences = {
  // Update user preferences
  updatePreferences: (newPreferences) => {
    dummyUser.preferences = { ...dummyUser.preferences, ...newPreferences };
    dummyUser.updated_at = new Date().toISOString();
    
    // Persist to localStorage for demo
    localStorage.setItem('user_preferences', JSON.stringify(dummyUser.preferences));
    
    return dummyUser.preferences;
  },

  // Load preferences from localStorage
  loadPreferences: () => {
    const saved = localStorage.getItem('user_preferences');
    if (saved) {
      try {
        dummyUser.preferences = { ...dummyUser.preferences, ...JSON.parse(saved) };
      } catch {
        // Use defaults if parsing fails
      }
    }
    return dummyUser.preferences;
  }
};

// Mock user stats functions
export const mockUserStats = {
  // Increment listening time
  addListeningTime: (minutes) => {
    dummyUser.stats.total_listening_time += minutes;
    return dummyUser.stats;
  },

  // Increment tracks played
  incrementTracksPlayed: () => {
    dummyUser.stats.total_tracks_played += 1;
    return dummyUser.stats;
  },

  // Update favorite genre (mock calculation)
  updateFavoriteGenre: (genre) => {
    dummyUser.stats.favorite_genre = genre;
    return dummyUser.stats;
  }
};