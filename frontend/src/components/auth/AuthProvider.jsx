import { useAuth } from '../../hooks/useAuth.jsx';

// Higher-order component for protecting routes that require authentication
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-dark-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <LoginComponent />;
  }

  // Render protected content if authenticated
  return children;
};

// Login component wrapper
const LoginComponent = () => {
  return (
    <LoginForm onSuccess={() => {
      // The AuthProvider will handle updating the authentication state
      // and this component will re-render automatically
    }} />
  );
};

// Re-export AuthProvider from useAuth hook for convenience
export { AuthProvider } from '../../hooks/useAuth.jsx';

// Component to handle logout
export const LogoutButton = ({ className = "btn-ghost" }) => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!user) return null;

  return (
    <button
      onClick={handleLogout}
      className={className}
      title="Sign out"
    >
      Sign out
    </button>
  );
};

// User profile display component
export const UserProfile = ({ className = "" }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-8 w-8 bg-dark-700 rounded-full"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img
        src={user.profile_image_url}
        alt={user.username}
        className="h-8 w-8 rounded-full object-cover bg-dark-700"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div 
        className="h-8 w-8 rounded-full bg-primary-600 hidden items-center justify-center text-white text-sm font-medium"
        style={{ display: 'none' }}
      >
        {user.first_name?.[0]}{user.last_name?.[0]}
      </div>
      <div className="text-sm">
        <div className="text-white font-medium">{user.username}</div>
        <div className="text-dark-400">{user.email}</div>
      </div>
    </div>
  );
};

// Authentication status indicator
export const AuthStatus = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-dark-400">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
        <span className="text-sm">Checking authentication...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <div 
        className={`h-2 w-2 rounded-full ${
          isAuthenticated ? 'bg-green-500' : 'bg-red-500'
        }`}
      ></div>
      <span className="text-sm text-dark-300">
        {isAuthenticated ? `Signed in as ${user?.username}` : 'Not signed in'}
      </span>
    </div>
  );
};

// Import LoginForm component
import { LoginForm } from './LoginForm.jsx';