import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'cashier';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  branchId: string;
  branchName: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: { email: string; password: string; user: User }[] = [
  {
    email: 'admin@diff.ng',
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@diff.ng',
      name: 'Admin User',
      role: 'admin',
      branchId: 'branch-1',
      branchName: 'Diff Lagos - Lekki',
      isActive: true,
    },
  },
  {
    email: 'cashier@diff.ng',
    password: 'cashier123',
    user: {
      id: '2',
      email: 'cashier@diff.ng',
      name: 'Jane Cashier',
      role: 'cashier',
      branchId: 'branch-1',
      branchName: 'Diff Lagos - Lekki',
      isActive: true,
    },
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('diff-pos-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const found = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (found && found.user.isActive) {
      setUser(found.user);
      localStorage.setItem('diff-pos-user', JSON.stringify(found.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('diff-pos-user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
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
