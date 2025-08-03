import { useState, useEffect, useContext, createContext } from 'react';
import { dummyUser, mockAuth } from '../data/dummyUser.js';

// Create auth context
const AuthContext = createContext(null);

// Auth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('music_player_token');
      if (token && mockAuth.validateToken(token)) {
        const userData = mockAuth.getUserFromToken(token);
        if (userData) {
          setUser(dummyUser);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await mockAuth.login(email, password);
      
      // Store token and user data
      localStorage.setItem('music_player_token', response.token);
      localStorage.setItem('music_player_user', JSON.stringify(response.user));
      
      setUser(response.user);
      setIsLoading(false);
      
      return { success: true, message: response.message };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Logout function
  const logout = () => {
    mockAuth.logout();
    setUser(null);
    setError(null);
  };

  // Register function (mock - just redirects to login)
  const register = async (userData) => {
    // In a real app, this would call the registration API
    // For now, just simulate success and redirect to login
    setError(null);
    return { 
      success: true, 
      message: 'Registration successful! Please log in with any credentials.' 
    };
  };

  // Update user profile (mock)
  const updateProfile = async (profileData) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data
      const updatedUser = { ...user, ...profileData, updated_at: new Date().toISOString() };
      setUser(updatedUser);
      
      // Update localStorage
      localStorage.setItem('music_player_user', JSON.stringify(updatedUser));
      
      setIsLoading(false);
      return { success: true, message: 'Profile updated successfully' };
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Get current token
  const getToken = () => {
    return localStorage.getItem('music_player_token');
  };

  // Refresh authentication (mock)
  const refreshAuth = async () => {
    const token = getToken();
    if (token && mockAuth.validateToken(token)) {
      return true;
    }
    logout();
    return false;
  };

  const value = {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    register,
    updateProfile,
    getToken,
    refreshAuth,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};