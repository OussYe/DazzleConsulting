import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

type UserRole = 'admin' | 'editor' | 'user';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (requiredRole: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('dazzleUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create user object from Supabase auth data
        const userObject: User = {
          id: authData.user.id,
          email: authData.user.email || '',
          name: authData.user.email?.split('@')[0] || 'User', // Default name from email
          role: 'user' // Default role
        };

        setUser(userObject);
        localStorage.setItem('dazzleUser', JSON.stringify(userObject));
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem('dazzleUser');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!user) return false;
    
    // Simple role hierarchy: admin > editor > user
    if (user.role === 'admin') return true;
    if (user.role === 'editor' && requiredRole !== 'admin') return true;
    return user.role === requiredRole;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      logout,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
