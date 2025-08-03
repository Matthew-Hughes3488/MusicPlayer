import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Library, 
  Heart, 
  Clock, 
  Plus, 
  Music,
  Headphones,
  TrendingUp,
  Radio,
  ChevronRight,
  Upload,
  Compass
} from 'lucide-react';
import { useDummyData } from '../../hooks/useDummyData.js';

export const Sidebar = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('home');
  const { playlists, stats } = useDummyData();

  const mainNavItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'explore', label: 'Explore', icon: Compass, path: '/explore' },
    { id: 'search', label: 'Search', icon: Search, path: '/search' },
    { id: 'library', label: 'Your Library', icon: Library, path: '/library' },
  ];

  const libraryItems = [
    { id: 'liked', label: 'Liked Songs', icon: Heart, count: stats.totalTracks },
    { id: 'recent', label: 'Recently Played', icon: Clock },
    { id: 'upload', label: 'Upload Music', icon: Upload },
  ];

  const discoverItems = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'radio', label: 'Radio', icon: Radio },
    { id: 'genres', label: 'Browse Genres', icon: Music },
  ];

  // Get user playlists (excluding system playlists)
  const userPlaylists = playlists.filter(playlist => 
    !playlist.isLikedSongs && !playlist.isRecentlyPlayed
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 lg:z-auto
        h-screen w-64 bg-dark-900 border-r border-white/10
        transform transition-transform duration-200 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Headphones className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">My Music</h2>
              <p className="text-xs text-dark-400">{stats.totalTracks} tracks</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {/* Main Navigation */}
          <div className="px-4 mb-6">
            <ul className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                
                return (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) => `
                        w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-primary-600 text-white shadow-glow' 
                          : 'text-dark-300 hover:text-white hover:bg-white/10'
                        }
                      `}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Library Section */}
          <div className="px-4 mb-6">
            <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">
              Your Library
            </h3>
            <ul className="space-y-1">
              {libraryItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-primary-600 text-white shadow-glow' 
                          : 'text-dark-300 hover:text-white hover:bg-white/10'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {item.count && (
                        <span className="text-xs bg-dark-700 px-2 py-1 rounded-full">
                          {item.count}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Discover Section */}
          <div className="px-4 mb-6">
            <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider mb-3">
              Discover
            </h3>
            <ul className="space-y-1">
              {discoverItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-primary-600 text-white shadow-glow' 
                          : 'text-dark-300 hover:text-white hover:bg-white/10'
                        }
                      `}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Playlists Section */}
          <div className="px-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-dark-400 uppercase tracking-wider">
                Playlists
              </h3>
              <button 
                className="p-1 rounded hover:bg-white/10 transition-colors"
                title="Create new playlist"
              >
                <Plus className="h-4 w-4 text-dark-400 hover:text-white" />
              </button>
            </div>
            
            {userPlaylists.length > 0 ? (
              <ul className="space-y-1">
                {userPlaylists.map((playlist) => {
                  const isActive = activeSection === `playlist-${playlist.id}`;
                  
                  return (
                    <li key={playlist.id}>
                      <button
                        onClick={() => setActiveSection(`playlist-${playlist.id}`)}
                        className={`
                          w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200
                          ${isActive 
                            ? 'bg-primary-600 text-white shadow-glow' 
                            : 'text-dark-300 hover:text-white hover:bg-white/10'
                          }
                        `}
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className="h-8 w-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded flex items-center justify-center flex-shrink-0">
                            <Music className="h-4 w-4 text-white" />
                          </div>
                          <div className="min-w-0 text-left">
                            <div className="font-medium truncate">{playlist.name}</div>
                            <div className="text-xs text-dark-400">
                              {playlist.tracks.length} song{playlist.tracks.length !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-center py-8">
                <Music className="h-12 w-12 text-dark-600 mx-auto mb-3" />
                <p className="text-dark-500 text-sm mb-3">No playlists yet</p>
                <button className="btn-primary text-sm">
                  Create your first playlist
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Footer Stats */}
        <div className="p-4 border-t border-white/10">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-dark-400">Total Songs</span>
              <span className="text-white font-medium">{stats.totalTracks}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-dark-400">Playlists</span>
              <span className="text-white font-medium">{stats.totalPlaylists}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-dark-400">Genres</span>
              <span className="text-white font-medium">{stats.genreCount}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};