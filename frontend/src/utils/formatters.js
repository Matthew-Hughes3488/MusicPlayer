// Utility functions for formatting data in the music player

// Format duration from seconds to MM:SS or H:MM:SS format
export const formatDuration = (seconds) => {
  if (!seconds || seconds < 0) return "0:00";
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Format file size from bytes to human-readable format
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Format date to relative time (e.g., "2 hours ago", "Yesterday")
export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 }
  ];
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return count === 1 
        ? `1 ${interval.label} ago`
        : `${count} ${interval.label}s ago`;
    }
  }
  
  return 'Just now';
};

// Format date to display format (e.g., "Jan 15, 2024")
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

// Format number with commas (e.g., 1,234,567)
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Format percentage (e.g., 0.7 -> "70%")
export const formatPercentage = (decimal, decimalPlaces = 0) => {
  return `${(decimal * 100).toFixed(decimalPlaces)}%`;
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};

// Capitalize first letter of each word
export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

// Format artist names (handle arrays or strings)
export const formatArtists = (artists) => {
  if (Array.isArray(artists)) {
    return artists.join(', ');
  }
  return artists || 'Unknown Artist';
};

// Generate initials from name (for avatars)
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
};

// Format search query (trim, lowercase, remove special chars)
export const formatSearchQuery = (query) => {
  return query
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/gi, '');
};

// Generate a random hex color
export const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

// Get contrast text color based on background
export const getContrastColor = (hexColor) => {
  // Remove # if present
  const color = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate a slug from text (for URLs)
export const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll events
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Format playlist duration (sum of all track durations)
export const formatPlaylistDuration = (tracks) => {
  const totalSeconds = tracks.reduce((total, track) => total + (track.duration || 0), 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours} hr ${minutes} min`;
  }
  return `${minutes} min`;
};

// Get readable file type from extension
export const getFileTypeFromExtension = (filename) => {
  const extension = filename.split('.').pop().toLowerCase();
  const types = {
    'mp3': 'MP3 Audio',
    'wav': 'WAV Audio', 
    'flac': 'FLAC Audio',
    'aac': 'AAC Audio',
    'ogg': 'OGG Audio',
    'm4a': 'M4A Audio',
    'wma': 'WMA Audio'
  };
  return types[extension] || 'Audio File';
};

// Sort functions for different data types
export const sortFunctions = {
  // Sort tracks by different criteria
  byTitle: (a, b) => a.title.localeCompare(b.title),
  byArtist: (a, b) => a.artist.localeCompare(b.artist),
  byDuration: (a, b) => (b.duration || 0) - (a.duration || 0),
  byDateAdded: (a, b) => new Date(b.created_at) - new Date(a.created_at),
  byGenre: (a, b) => a.genre.localeCompare(b.genre),
  
  // Sort playlists
  byName: (a, b) => a.name.localeCompare(b.name),
  byDateCreated: (a, b) => new Date(b.created_at) - new Date(a.created_at),
  byTrackCount: (a, b) => (b.tracks?.length || 0) - (a.tracks?.length || 0)
};