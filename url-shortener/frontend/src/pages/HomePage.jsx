import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-white text-center flex flex-col items-center justify-center h-full p-8">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Shorty</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            The simplest way to create, share, and track your links. Join now to manage your personal short URLs with ease.
        </p>
        <div className="flex gap-4">
            <Link to="/login" className="bg-transparent border border-indigo-500 text-indigo-400 py-3 px-8 rounded-lg hover:bg-indigo-500 hover:text-white transition-all">
                Login
            </Link>
            <Link to="/register" className="bg-indigo-600 text-white py-3 px-8 rounded-lg hover:bg-indigo-700 transition-all">
                Get Started
            </Link>
        </div>
    </div>
  );
};

export default HomePage;