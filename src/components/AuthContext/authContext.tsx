
"use client"

import { routes } from '@/utils/const';
import { useRouter } from 'next/navigation';
// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const login = () => {
    // Implementa la logica di login
    setIsLoggedIn(true);
    router.push(routes.home);
  };

  const logout = () => {
    // Implementa la logica di logout
    setIsLoggedIn(false);
    router.push(routes.login);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
