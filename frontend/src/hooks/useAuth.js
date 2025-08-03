import { useState, useContext, createContext, useEffect } from 'react';
import { dummyUser } from '../data/dummyUser.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check for existing auth on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('userData');
    
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dummy authentication - in real app, this would call the backend
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        const dummyToken = 'dummy-jwt-token-' + Date.now();
        
        setToken(dummyToken);
        setUser(dummyUser);
        setIsAuthenticated(true);
        
        // Save to localStorage
        localStorage.setItem('authToken', dummyToken);
        localStorage.setItem('userData', JSON.stringify(dummyUser));
        
        return { success: true, user: dummyUser, token: dummyToken };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  const updateUserPreferences = (preferences) => {
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        ...preferences
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
  };

  const register = async (userData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dummy registration - in real app, this would call the backend
      const newUser = {
        ...dummyUser,
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        id: Date.now(),
        joinedAt: new Date().toISOString()
      };
      
      const dummyToken = 'dummy-jwt-token-' + Date.now();
      
      setToken(dummyToken);
      setUser(newUser);
      setIsAuthenticated(true);
      
      // Save to localStorage
      localStorage.setItem('authToken', dummyToken);
      localStorage.setItem('userData', JSON.stringify(newUser));
      
      return { success: true, user: newUser, token: dummyToken };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async () => {
    // Simulate token refresh
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newToken = 'refreshed-jwt-token-' + Date.now();
      setToken(newToken);
      localStorage.setItem('authToken', newToken);
      return { success: true, token: newToken };
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      return { success: false, error: error.message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password reset email sent to:', email);
      return { success: true, message: 'Password reset email sent' };
    } catch (error) {
      console.error('Forgot password error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    token,
    login,
    logout,
    register,
    updateUserPreferences,
    refreshToken,
    forgotPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};