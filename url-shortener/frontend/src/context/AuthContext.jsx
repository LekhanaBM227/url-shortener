import React, { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // <-- Import the new library

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // We now store the entire user object, not just the token
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Check if token is expired. The 'exp' claim is in seconds.
        if (decodedToken.exp * 1000 > Date.now()) {
          return { username: decodedToken.sub }; // 'sub' is the standard claim for username
        }
      } catch (error) {
        return null; // Token is invalid
      }
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  const login = (newToken) => {
    try {
      localStorage.setItem('token', newToken);
      const decodedToken = jwtDecode(newToken);
      const userObject = { username: decodedToken.sub };
      setUser(userObject);
      setIsAuthenticated(true);
    } catch (error) {
      // Handle potential invalid token during login
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };
  
  // Provide the user object along with the other values
  const value = { user, isAuthenticated, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};