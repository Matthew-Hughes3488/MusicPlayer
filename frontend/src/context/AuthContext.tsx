import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, AuthContextType } from '../types';
import { apiService } from '../services/api';
import { decodeJWT, isTokenExpired, getUserIdFromToken, getUserRoleFromToken } from '../services/jwt';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const storedToken = localStorage.getItem('token');
    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken);
      loadUserFromToken(storedToken);
    } else {
      localStorage.removeItem('token');
      setLoading(false);
    }
  }, []);

  const loadUserFromToken = async (authToken: string) => {
    try {
      const userId = getUserIdFromToken(authToken);
      const userRole = getUserRoleFromToken(authToken);
      
      if (userId && userRole) {
        // Try to fetch full user data
        try {
          const userData = await apiService.getUserById(userId);
          setUser(userData);
        } catch {
          // If API call fails, create user from token data
          const payload = decodeJWT(authToken);
          if (payload) {
            setUser({
              user_id: parseInt(payload.sub),
              email: `user${payload.sub}@example.com`, // Fallback email
              role: payload.role as 'admin' | 'user'
            });
          }
        }
      }
    } catch (err) {
      console.error('Failed to load user from token:', err);
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Demo mode for presentation
      if (email.includes('@example.com') && password) {
        const demoUser: User = {
          user_id: email === 'admin@example.com' ? 1 : 2,
          email,
          role: email === 'admin@example.com' ? 'admin' : 'user'
        };
        
        const demoToken = `demo.${btoa(JSON.stringify({
          sub: demoUser.user_id.toString(),
          exp: Math.floor(Date.now() / 1000) + 3600,
          iat: Math.floor(Date.now() / 1000),
          role: demoUser.role
        }))}.demo`;
        
        setUser(demoUser);
        setToken(demoToken);
        localStorage.setItem('token', demoToken);
        return true;
      }
      
      // Try real API call
      const response = await apiService.login({ email, password });
      
      if (response.auth_token) {
        setToken(response.auth_token);
        localStorage.setItem('token', response.auth_token);
        await loadUserFromToken(response.auth_token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await apiService.register({ email, password });
      
      if (response.auth_token) {
        setToken(response.auth_token);
        localStorage.setItem('token', response.auth_token);
        await loadUserFromToken(response.auth_token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}