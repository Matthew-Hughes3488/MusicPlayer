import React, { useState, useContext, createContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { dummyUser } from '../data/dummyUser.js';
import type { User, AuthResult } from '../types/index.js';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<AuthResult>;
  logout: () => void;
  register: (userData: any) => Promise<AuthResult>;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
  refreshToken: () => Promise<{ success: boolean; token?: string; error?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

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

  const login = async (credentials: { email: string; password: string }): Promise<AuthResult> => {
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
    } catch (error: any) {
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

  const updateUserPreferences = (preferences: Partial<User['preferences']>) => {
    if (!user) return;
    
    const updatedUser: User = {
      ...user,
      preferences: {
        ...user.preferences,
        ...preferences
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
  };

  const register = async (userData: any): Promise<AuthResult> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dummy registration - in real app, this would call the backend
      const newUser: User = {
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
    } catch (error: any) {
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
    } catch (error: any) {
      console.error('Token refresh error:', error);
      logout();
      return { success: false, error: error.message };
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password reset email sent to:', email);
      return { success: true, message: 'Password reset email sent' };
    } catch (error: any) {
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