import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: UserRole, hostel?: string, block?: string, room?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, this would call an API
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password.length >= 6) {
      setUser(foundUser);
      return true;
    }
    // Allow any email/password for demo
    if (email && password.length >= 6) {
      const isAdmin = email.includes('admin');
      const isCaretaker = email.includes('caretaker');
      const newUser: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        role: isAdmin ? 'admin' : isCaretaker ? 'caretaker' : 'student',
        hostel: 'Hostel A',
        block: 'Block 1',
        room: '101',
      };
      setUser(newUser);
      return true;
    }
    return false;
  }, []);

  const signup = useCallback(async (
    name: string, 
    email: string, 
    password: string, 
    role: UserRole,
    hostel?: string,
    block?: string,
    room?: string
  ): Promise<boolean> => {
    if (name && email && password.length >= 6) {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role,
        hostel,
        block,
        room,
      };
      setUser(newUser);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
