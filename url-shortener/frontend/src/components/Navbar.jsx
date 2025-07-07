import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  // 1. Get the 'user' object from the context, in addition to isAuthenticated and logout
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const activeLinkStyle = {
    color: 'white',
    textDecoration: 'underline',
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* --- Left Side of Navbar --- */}
        <div className="flex items-center space-x-4">
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="text-white text-2xl font-bold tracking-wider">
            Shorty
          </Link>
          
          {/* 2. Conditionally render the username if the user is authenticated */}
          {isAuthenticated && user && (
            <>
              <span className="text-gray-500 hidden sm:inline-block">|</span>
              <span className="text-indigo-400 font-semibold hidden sm:inline-block">
                Welcome, {user.username}
              </span>
            </>
          )}
        </div>

        {/* --- Right Side of Navbar --- */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {isAuthenticated ? (
            // If logged in, show these links
            <>
              <NavLink 
                to="/dashboard" 
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                style={({ isActive }) => isActive ? activeLinkStyle : undefined}
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/profile" 
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                style={({ isActive }) => isActive ? activeLinkStyle : undefined}
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            // If logged out, show these links
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors px-3 py-2">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;