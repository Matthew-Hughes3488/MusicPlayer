import { useState } from 'react';
// @ts-ignore
import { AuthProvider, ProtectedRoute } from './components/auth/AuthProvider.jsx';
// @ts-ignore
import { Header } from './components/layout/Header.jsx';
// @ts-ignore
import { Sidebar } from './components/layout/Sidebar.jsx';
// @ts-ignore
import { PlayerControls } from './components/layout/PlayerControls.jsx';
// @ts-ignore
import { useDummyData } from './hooks/useDummyData.js';
import './App.css';

// Main content component
const MainContent = () => {
  const { tracks, loading } = useDummyData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-dark-300">Loading your music...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Good evening, Matthew
          </h1>
          <p className="text-dark-300">
            Ready to discover new music? You have {tracks.length} tracks in your library.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="card hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-red-500 to-pink-500 p-4 rounded-lg">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Liked Songs</h3>
                <p className="text-dark-400 text-sm">Your favorite tracks</p>
              </div>
            </div>
          </div>

          <div className="card hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-green-500 to-blue-500 p-4 rounded-lg">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Recently Played</h3>
                <p className="text-dark-400 text-sm">Your listening history</p>
              </div>
            </div>
          </div>

          <div className="card hover:bg-white/5 transition-colors cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-500 p-4 rounded-lg">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Discover Weekly</h3>
                <p className="text-dark-400 text-sm">New music for you</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tracks Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Recently Added</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tracks.slice(0, 6).map((track: any) => (
              <div key={track.id} className="group">
                <div className="card p-4 hover:bg-white/5 transition-all duration-200 cursor-pointer">
                  <div className="aspect-square mb-4 relative overflow-hidden rounded-lg">
                    <img
                      src={track.cover_image_url}
                      alt={track.title}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <button className="bg-primary-600 p-3 rounded-full hover:bg-primary-700 transition-colors">
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <h3 className="text-white font-medium text-sm mb-1 truncate">{track.title}</h3>
                  <p className="text-dark-400 text-xs truncate">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Made for You */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Made for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card p-6 bg-gradient-to-br from-primary-900/50 to-secondary-900/50 border border-primary-500/20">
              <h3 className="text-xl font-bold text-white mb-2">Rock Classics Mix</h3>
              <p className="text-dark-300 mb-4">The greatest rock songs of all time</p>
              <button className="btn-primary">Play Mix</button>
            </div>

            <div className="card p-6 bg-gradient-to-br from-green-900/50 to-blue-900/50 border border-green-500/20">
              <h3 className="text-xl font-bold text-white mb-2">Chill Vibes</h3>
              <p className="text-dark-300 mb-4">Relaxing songs for any time of day</p>
              <button className="btn-secondary">Play Mix</button>
            </div>

            <div className="card p-6 bg-gradient-to-br from-red-900/50 to-pink-900/50 border border-red-500/20">
              <h3 className="text-xl font-bold text-white mb-2">Your Top Songs</h3>
              <p className="text-dark-300 mb-4">Songs you can't stop playing</p>
              <button className="btn-ghost border border-white/20">Play Mix</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Layout
const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex bg-dark-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header 
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto pb-24">
          <MainContent />
        </main>
      </div>

      {/* Player controls */}
      <PlayerControls />
    </div>
  );
};

// Root App component
function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;
