import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth.tsx';
import { useAudioPlayer } from './hooks/useAudioPlayer.js';
import { useDummyData } from './hooks/useDummyData.js';
import type { Track, Playlist } from './types/index.js';

// Layout Components
import Header from './components/layout/Header.tsx';
import Sidebar from './components/layout/Sidebar.tsx';
import PlayerControls from './components/layout/PlayerControls.tsx';

// Auth Components
import LoginForm from './components/auth/LoginForm.tsx';

// Music Components
import TrackList from './components/music/TrackList.tsx';
import NowPlaying from './components/music/NowPlaying.tsx';

// Playlist Components
import PlaylistView from './components/playlist/PlaylistView.tsx';
import PlaylistCreator from './components/playlist/PlaylistCreator.tsx';

// Upload Components
import FileUploader from './components/upload/FileUploader.tsx';

import './index.css';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showPlaylistCreator, setShowPlaylistCreator] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Data states
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Audio player
  const audioPlayer = useAudioPlayer();
  const { getTracks, getPlaylists, searchTracks } = useDummyData();

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [tracksData, playlistsData] = await Promise.all([
          getTracks(),
          getPlaylists()
        ]);
        setTracks(tracksData);
        setPlaylists(playlistsData);
        setFilteredTracks(tracksData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, getTracks, getPlaylists]);

  // Handle search
  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setFilteredTracks(tracks);
        return;
      }

      try {
        const searchResults = await searchTracks(searchQuery);
        setFilteredTracks(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setFilteredTracks([]);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, tracks, searchTracks]);

  // Handle view changes
  const handleViewChange = (view: string, playlistId: string | null = null) => {
    setCurrentView(view);
    setSelectedPlaylistId(playlistId);
    
    if (view === 'create-playlist') {
      setShowPlaylistCreator(true);
    }
  };

  // Handle track play
  const handleTrackPlay = (track: Track, playlist: Track[] | null = null, index: number = 0) => {
    audioPlayer.playTrack(track, playlist || filteredTracks, index);
  };

  // Handle playlist creation
  const handlePlaylistCreated = (newPlaylist: Playlist) => {
    setPlaylists(prev => [...prev, newPlaylist]);
    setShowPlaylistCreator(false);
  };

  // Handle add to playlist (placeholder)
  const handleAddToPlaylist = (track: Track) => {
    console.log('Add to playlist:', track);
    // TODO: Implement add to playlist functionality
  };

  // Handle like track (placeholder)
  const handleLikeTrack = (track: Track) => {
    console.log('Like track:', track);
    // TODO: Implement like functionality
  };

  // Show login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setShowLogin(true);
    }
  }, [isAuthenticated]);

  // Render main content based on current view
  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      );
    }

    switch (currentView) {
      case 'home':
        return (
          <div className="space-y-8">
            <NowPlaying
              currentTrack={audioPlayer.currentTrack}
              isPlaying={audioPlayer.isPlaying}
              currentTime={audioPlayer.currentTime}
              duration={audioPlayer.duration}
              progress={audioPlayer.progress}
              onSeek={audioPlayer.seek}
              onLike={handleLikeTrack}
            />
            <TrackList
              tracks={filteredTracks}
              currentTrack={audioPlayer.currentTrack}
              isPlaying={audioPlayer.isPlaying}
              onTrackPlay={handleTrackPlay}
              onAddToPlaylist={handleAddToPlaylist}
              title={searchQuery ? `Search Results for "${searchQuery}"` : "All Songs"}
            />
          </div>
        );
      
      case 'library':
        return (
          <TrackList
            tracks={filteredTracks}
            currentTrack={audioPlayer.currentTrack}
            isPlaying={audioPlayer.isPlaying}
            onTrackPlay={handleTrackPlay}
            onAddToPlaylist={handleAddToPlaylist}
            title="Your Library"
          />
        );
      
      case 'liked':
        const likedTracks = tracks.filter(track => track.liked);
        return (
          <TrackList
            tracks={likedTracks}
            currentTrack={audioPlayer.currentTrack}
            isPlaying={audioPlayer.isPlaying}
            onTrackPlay={handleTrackPlay}
            onAddToPlaylist={handleAddToPlaylist}
            title="Liked Songs"
          />
        );
      
      case 'upload':
        return <FileUploader />;
      
      case 'playlist':
        return (
          <PlaylistView
            playlistId={selectedPlaylistId}
            currentTrack={audioPlayer.currentTrack}
            isPlaying={audioPlayer.isPlaying}
            onTrackPlay={handleTrackPlay}
            onAddToPlaylist={handleAddToPlaylist}
          />
        );
      
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Welcome to MusicPlayer</h2>
            <p className="text-gray-400">Select an option from the sidebar to get started</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <Header 
        onSearch={setSearchQuery} 
        searchQuery={searchQuery}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentView={currentView}
          onViewChange={handleViewChange}
          playlists={playlists}
        />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderMainContent()}
        </main>
      </div>
      
      {/* Player Controls */}
      <PlayerControls
        currentTrack={audioPlayer.currentTrack}
        isPlaying={audioPlayer.isPlaying}
        isLoading={audioPlayer.isLoading}
        currentTime={audioPlayer.currentTime}
        duration={audioPlayer.duration}
        progress={audioPlayer.progress}
        isShuffled={audioPlayer.isShuffled}
        repeatMode={audioPlayer.repeatMode}
        volume={audioPlayer.volume}
        isMuted={audioPlayer.isMuted}
        onPlayPause={audioPlayer.togglePlayPause}
        onNext={audioPlayer.playNext}
        onPrevious={audioPlayer.playPrevious}
        onSeek={audioPlayer.seek}
        onShuffle={audioPlayer.toggleShuffle}
        onRepeat={audioPlayer.toggleRepeat}
        onVolumeChange={audioPlayer.changeVolume}
        onMute={audioPlayer.toggleMute}
      />

      {/* Login Modal */}
      {showLogin && !isAuthenticated && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            // TODO: Implement register form
            console.log('Switch to register');
          }}
        />
      )}

      {/* Playlist Creator Modal */}
      {showPlaylistCreator && (
        <PlaylistCreator
          onClose={() => setShowPlaylistCreator(false)}
          onPlaylistCreated={handlePlaylistCreated}
        />
      )}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
