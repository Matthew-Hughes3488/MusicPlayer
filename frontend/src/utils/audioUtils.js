// Audio utility functions for the music player

export class AudioManager {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
    this.volume = 0.7;
    this.isMuted = false;
    this.previousVolume = 0.7;
    this.listeners = [];
  }

  // Initialize audio with a track
  loadTrack(trackUrl) {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }

    // For demo purposes, we'll use a mock audio object since the URLs are placeholders
    this.audio = this.createMockAudio(trackUrl);
    this.setupEventListeners();
    
    return new Promise((resolve) => {
      // Simulate loading delay
      setTimeout(() => {
        this.duration = this.audio.duration;
        this.notifyListeners('loadeddata');
        resolve();
      }, 500);
    });
  }

  // Create a mock audio object for demo purposes
  createMockAudio(src) {
    const mockAudio = {
      src,
      currentTime: 0,
      duration: 180 + Math.random() * 120, // Random duration between 3-5 minutes
      volume: this.volume,
      muted: this.isMuted,
      paused: true,
      ended: false,
      
      play: () => {
        mockAudio.paused = false;
        this.isPlaying = true;
        this.startMockPlayback();
        return Promise.resolve();
      },
      
      pause: () => {
        mockAudio.paused = true;
        this.isPlaying = false;
        this.stopMockPlayback();
      },
      
      load: () => {},
      
      addEventListener: (event, callback) => {
        // Store callback for manual triggering
        if (!mockAudio.events) mockAudio.events = {};
        if (!mockAudio.events[event]) mockAudio.events[event] = [];
        mockAudio.events[event].push(callback);
      },
      
      removeEventListener: (event, callback) => {
        if (mockAudio.events && mockAudio.events[event]) {
          mockAudio.events[event] = mockAudio.events[event].filter(cb => cb !== callback);
        }
      },
      
      dispatchEvent: (event) => {
        if (mockAudio.events && mockAudio.events[event.type]) {
          mockAudio.events[event.type].forEach(callback => callback(event));
        }
      }
    };

    return mockAudio;
  }

  // Start mock playback simulation
  startMockPlayback() {
    if (this.playbackInterval) clearInterval(this.playbackInterval);
    
    this.playbackInterval = setInterval(() => {
      if (this.audio && !this.audio.paused) {
        this.audio.currentTime += 1;
        this.currentTime = this.audio.currentTime;
        
        // Check if track ended
        if (this.currentTime >= this.duration) {
          this.audio.currentTime = this.duration;
          this.audio.ended = true;
          this.audio.paused = true;
          this.isPlaying = false;
          this.stopMockPlayback();
          this.notifyListeners('ended');
        } else {
          this.notifyListeners('timeupdate');
        }
      }
    }, 1000);
  }

  // Stop mock playback simulation
  stopMockPlayback() {
    if (this.playbackInterval) {
      clearInterval(this.playbackInterval);
      this.playbackInterval = null;
    }
  }

  // Setup event listeners
  setupEventListeners() {
    if (!this.audio) return;

    const events = ['play', 'pause', 'ended', 'timeupdate', 'loadeddata', 'error'];
    
    events.forEach(event => {
      this.audio.addEventListener(event, (e) => {
        this.notifyListeners(event, e);
      });
    });
  }

  // Play audio
  async play() {
    if (this.audio) {
      try {
        await this.audio.play();
        this.isPlaying = true;
        return true;
      } catch (error) {
        console.error('Playback failed:', error);
        return false;
      }
    }
    return false;
  }

  // Pause audio
  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  // Toggle play/pause
  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  // Seek to specific time
  seekTo(time) {
    if (this.audio) {
      this.audio.currentTime = Math.max(0, Math.min(time, this.duration));
      this.currentTime = this.audio.currentTime;
      this.notifyListeners('seeked');
    }
  }

  // Set volume (0-1)
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
    if (this.volume > 0) {
      this.isMuted = false;
      this.audio.muted = false;
    }
    this.notifyListeners('volumechange');
  }

  // Toggle mute
  toggleMute() {
    if (this.isMuted) {
      this.isMuted = false;
      this.volume = this.previousVolume;
    } else {
      this.isMuted = true;
      this.previousVolume = this.volume;
      this.volume = 0;
    }
    
    if (this.audio) {
      this.audio.muted = this.isMuted;
      this.audio.volume = this.volume;
    }
    
    this.notifyListeners('volumechange');
  }

  // Add event listener
  addEventListener(event, callback) {
    this.listeners.push({ event, callback });
  }

  // Remove event listener
  removeEventListener(event, callback) {
    this.listeners = this.listeners.filter(
      listener => listener.event !== event || listener.callback !== callback
    );
  }

  // Notify all listeners
  notifyListeners(event, data = null) {
    this.listeners
      .filter(listener => listener.event === event)
      .forEach(listener => listener.callback(data));
  }

  // Get current state
  getState() {
    return {
      isPlaying: this.isPlaying,
      currentTime: this.currentTime,
      duration: this.duration,
      volume: this.volume,
      isMuted: this.isMuted,
      progress: this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0
    };
  }

  // Cleanup
  destroy() {
    this.stopMockPlayback();
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    this.listeners = [];
  }
}

// Create singleton instance
export const audioManager = new AudioManager();

// Helper functions for audio format detection
export const getSupportedAudioFormats = () => {
  const audio = document.createElement('audio');
  const formats = {};
  
  formats.mp3 = audio.canPlayType('audio/mpeg') !== '';
  formats.wav = audio.canPlayType('audio/wav') !== '';
  formats.ogg = audio.canPlayType('audio/ogg') !== '';
  formats.aac = audio.canPlayType('audio/aac') !== '';
  formats.flac = audio.canPlayType('audio/flac') !== '';
  
  return formats;
};

// Helper function to check if audio URL is valid
export const isValidAudioUrl = (url) => {
  const audioExtensions = ['.mp3', '.wav', '.ogg', '.aac', '.flac', '.m4a'];
  return audioExtensions.some(ext => url.toLowerCase().includes(ext));
};

// Helper function to extract file extension from URL
export const getAudioFormat = (url) => {
  const match = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
  return match ? match[1].toLowerCase() : 'unknown';
};