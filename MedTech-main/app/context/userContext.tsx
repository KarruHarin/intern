"use client"
// context/UserContext.tsx
import React, { createContext, useContext } from 'react';

interface UserContextProps {
  userName: string;
  role: string;
  id: string;
  email: string;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  userName: string;
  role: string;
  children: React.ReactNode;
  id:string
  email:string;
}

export const UserProvider: React.FC<UserProviderProps> = ({ userName, role,email,id, children }) => (
  <UserContext.Provider value={{ userName, role,id,email  }}>
    {children}
  </UserContext.Provider>
);
