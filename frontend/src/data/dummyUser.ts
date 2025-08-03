import type { User } from '../types/index.js';

export const dummyUser: User = {
  id: 1,
  username: "musiclover123",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  avatar: "https://via.placeholder.com/150x150/6366F1/ffffff?text=JD",
  isPremium: false,
  joinedAt: "2023-06-15T10:30:00Z",
  preferences: {
    theme: "dark",
    autoplay: true,
    shuffle: false,
    repeat: "off", // off, one, all
    volume: 0.7,
    quality: "high" // low, medium, high
  },
  stats: {
    totalListeningTime: "42h 30m",
    favoriteGenre: "Rock",
    tracksPlayed: 1247,
    playlistsCreated: 8
  }
};