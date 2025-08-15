import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  MusicalNoteIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function Navigation() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : 'hover:bg-blue-600';
  };

  if (!user) {
    return null; // Don't show navigation if not authenticated
  }

  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <MusicalNoteIcon className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">Music Player</span>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link
              to="/search"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${isActive('/search')}`}
            >
              <MagnifyingGlassIcon className="h-5 w-5 mr-1" />
              Search
            </Link>

            <Link
              to="/play"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${isActive('/play')}`}
            >
              <PlayIcon className="h-5 w-5 mr-1" />
              Play
            </Link>

            {user.role === 'admin' && (
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${isActive('/admin')}`}
              >
                <CogIcon className="h-5 w-5 mr-1" />
                Admin
              </Link>
            )}
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            <span className="text-sm">
              Welcome, <span className="font-medium">{user.email}</span>
              {user.role === 'admin' && (
                <span className="ml-1 px-2 py-1 text-xs bg-yellow-500 text-yellow-900 rounded-full">
                  Admin
                </span>
              )}
            </span>
            <button
              onClick={logout}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors duration-200 flex items-center"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}