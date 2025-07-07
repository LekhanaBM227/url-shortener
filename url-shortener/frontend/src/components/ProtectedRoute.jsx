import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  // Get the state from the context
  const { isAuthenticated } = useContext(AuthContext);

  // Directly check for the token in localStorage as a fallback.
  // This is the key to preventing "flickering" issues on page load or after login,
  // where the component might render before the context state has fully updated.
  const token = localStorage.getItem('token');

  // The condition is now: is the user either authenticated in our state OR is there a token present?
  // If neither is true, they are definitely not logged in.
  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  // If the condition is met, render the nested route (e.g., the Dashboard).
  return <Outlet />;
};

export default ProtectedRoute;