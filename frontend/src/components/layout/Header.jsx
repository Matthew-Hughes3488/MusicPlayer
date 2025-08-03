import { useState } from 'react';
import { Search, Menu, X, Bell, Settings, ChevronDown } from 'lucide-react';
import { UserProfile, LogoutButton } from '../auth/AuthProvider.jsx';
import { useAuth } from '../../hooks/useAuth.jsx';

export const Header = ({ onToggleSidebar, isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const notifications = [
    { id: 1, message: 'New album by Radiohead', time: '2 hours ago', unread: true },
    { id: 2, message: 'Your playlist was liked', time: '1 day ago', unread: false },
    { id: 3, message: 'Weekly music summary ready', time: '3 days ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-dark-800/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left section - Logo and Navigation */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <svg 
                className="h-6 w-6 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">MusicPlayer</h1>
              <p className="text-xs text-dark-300">by Matthew</p>
            </div>
          </div>
        </div>

        {/* Center section - Search */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-dark-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for songs, artists, albums..."
                className="input-primary pl-10 w-full"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-4 w-4 text-dark-400 hover:text-white" />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right section - Actions and User */}
        <div className="flex items-center space-x-2">
          {/* Mobile search button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Search className="h-5 w-5 text-white" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-white" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-dark-800 rounded-xl shadow-lg border border-white/10 z-50">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-lg font-semibold text-white">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${
                          notification.unread ? 'bg-primary-900/20' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`h-2 w-2 rounded-full mt-2 ${
                            notification.unread ? 'bg-primary-500' : 'bg-transparent'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-white text-sm">{notification.message}</p>
                            <p className="text-dark-400 text-xs mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-dark-400">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-white/10">
                  <button className="text-primary-400 hover:text-primary-300 text-sm w-full text-center">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Settings className="h-5 w-5 text-white" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <UserProfile className="text-sm" />
              <ChevronDown className="h-4 w-4 text-dark-400" />
            </button>

            {/* User dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-dark-800 rounded-xl shadow-lg border border-white/10 z-50">
                <div className="p-4 border-b border-white/10">
                  <div className="text-white font-medium">{user?.username}</div>
                  <div className="text-dark-400 text-sm">{user?.email}</div>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors">
                    Preferences
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors">
                    Subscription
                  </button>
                  <hr className="my-2 border-white/10" />
                  <LogoutButton className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-4">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-dark-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for songs, artists, albums..."
              className="input-primary pl-10 w-full"
            />
          </div>
        </form>
      </div>

      {/* Click outside handlers */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
};