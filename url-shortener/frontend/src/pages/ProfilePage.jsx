import React, { useState, useEffect } from 'react'; // <-- Add useEffect
import apiService from '../api/apiService';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
    // State for the form
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // --- NEW: State for user profile data ---
    const [username, setUsername] = useState('');
    const [isProfileLoading, setIsProfileLoading] = useState(true);

    // --- NEW: useEffect to fetch profile data on load ---
    useEffect(() => {
        const fetchProfile = async () => {
            setIsProfileLoading(true);
            try {
                const response = await apiService.get('/api/user/profile');
                setUsername(response.data.username);
            } catch (error) {
                toast.error("Could not load your profile information.");
            } finally {
                setIsProfileLoading(false);
            }
        };

        fetchProfile();
    }, []); // Empty array means this runs once when the component mounts

    const handleSubmit = async (e) => {
        // ... (The password change handleSubmit function remains the same) ...
    };

    return (
        <div className="container mx-auto p-4 sm:p-8">
            <div className="max-w-md mx-auto">
                {/* --- NEW: Profile Header Section --- */}
                <div className="text-center mb-8">
                    {isProfileLoading ? (
                        <h1 className="text-3xl font-bold text-white">Loading Profile...</h1>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold text-white">Profile</h1>
                            <p className="text-lg text-indigo-400 mt-2">Welcome, {username}!</p>
                        </>
                    )}
                </div>
                
                {/* --- Change Password Form Section --- */}
                <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-white text-center mb-8">Change Your Password</h2>
                    <form onSubmit={handleSubmit}>
                        {/* The form JSX remains the same */}
                        <div className="mb-4">
                            <label className="block text-gray-400 mb-2" htmlFor="current-password">Current Password</label>
                            <input
                                type="password"
                                id="current-password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                className="w-full p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-400 mb-2" htmlFor="new-password">New Password</label>
                            <input
                                type="password"
                                id="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="w-full p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-400 mb-2" htmlFor="confirm-password">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors"
                        >
                            {isLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;