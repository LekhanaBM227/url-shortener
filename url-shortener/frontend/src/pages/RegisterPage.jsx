import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../api/apiService';
import { toast } from 'react-hot-toast';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // New state to track if registration was successful
    const [isRegistered, setIsRegistered] = useState(false);

    // ... inside RegisterPage.jsx
const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        await apiService.post('/api/auth/register', { username, password });
        toast.success('Registration successful!');
        setIsRegistered(true);
    } catch (error) {
        // --- THIS IS THE FIX ---
        // Prioritize the backend's custom message. If it doesn't exist, use a generic string.
        let errorMessage = 'Registration failed. Please try again.';
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        } else if (error.response && error.response.data) {
            // Handle the case where the backend sends a simple string error
            // (like "Error: Username is already taken!")
            errorMessage = error.response.data;
        }
        
        toast.error(errorMessage); // Now we are guaranteed to pass a string.
        
    } finally {
        setIsLoading(false);
    }
};

    // If registration is successful, show the success view
    if (isRegistered) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Registration Complete!</h2>
                    <p className="text-gray-300 mb-6">Your account has been created successfully.</p>
                    <Link
                        to="/login"
                        className="w-full inline-block bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700"
                    >
                        Go to Login Now
                    </Link>
                </div>
            </div>
        );
    }
    
    // Otherwise, show the registration form
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white text-center mb-6">Create Your Account</h2>
                <form onSubmit={handleSubmit}>
                    {/* Form inputs... */}
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="username">Username</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 disabled:bg-indigo-400">
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="text-center text-gray-400 mt-4">
                    Already have an account? <Link to="/login" className="text-indigo-400 hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;