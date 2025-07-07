import React, { useState, useEffect } from 'react';
import apiService from '../api/apiService';
import { toast } from 'react-hot-toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// You can move this Spinner component to its own file in /components if you want
const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const DashboardPage = () => {
    // State for the new URL form
    const [longUrl, setLongUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // State for the list of existing URLs
    const [urls, setUrls] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    // Function to fetch the user's URLs from the backend
    const fetchUrls = async () => {
        setIsFetching(true);
        try {
            const response = await apiService.get('/api/urls');
            setUrls(response.data);
        } catch (error) {
            toast.error("Could not fetch your URLs. Please try again later.");
        } finally {
            setIsFetching(false);
        }
    };

    // Use useEffect to call fetchUrls when the component first loads
    useEffect(() => {
        fetchUrls();
    }, []); // The empty dependency array [] means this runs only once on mount

    // Function to handle the form submission for creating a new short URL
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await apiService.post('/api/urls', { longUrl });
            toast.success('URL shortened successfully!');
            
            // Add the newly created URL object (returned from the backend)
            // to the top of our existing list to update the UI instantly.
            setUrls(prevUrls => [response.data, ...prevUrls]);
            
            setLongUrl(''); // Clear the input field
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to shorten URL.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Helper function to format the date string nicely
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
            <div className="container mx-auto">
                {/* --- Section 1: The URL Shortener Form --- */}
                <div className="bg-gray-800 p-8 rounded-2xl shadow-lg mb-8">
                     <h1 className="text-3xl font-bold text-white text-center mb-6">Create a New Short Link</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="url"
                            value={longUrl}
                            onChange={(e) => setLongUrl(e.target.value)}
                            placeholder="Enter a long URL here..."
                            required
                            className="flex-grow p-4 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-indigo-600 font-bold py-4 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center justify-center transition-all"
                        >
                            {isSubmitting ? <Spinner /> : 'Shorten!'}
                        </button>
                    </form>
                </div>

                {/* --- Section 2: The Table of User's Links --- */}
                <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Your Links</h2>
                    <div className="overflow-x-auto">
                        {isFetching ? (
                            <p className="text-center text-gray-400 py-8">Loading your links...</p>
                        ) : (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-700 text-gray-400">
                                        <th className="p-4">Short Link</th>
                                        <th className="p-4">Original URL</th>
                                        <th className="p-4">Clicks</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {urls.map(url => (
                                        <tr key={url.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                            <td className="p-4">
                                                <a href={`http://localhost:8080/${url.shortCode}`} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                                                    {`localhost:8080/${url.shortCode}`}
                                                </a>
                                            </td>
                                            <td className="p-4 truncate max-w-xs">
                                                <a href={url.longUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                                    {url.longUrl}
                                                </a>
                                            </td>
                                            <td className="p-4">{url.clickCount}</td>
                                            <td className="p-4 text-gray-400">{formatDate(url.creationDate)}</td>
                                            <td className="p-4">
                                                <CopyToClipboard text={`http://localhost:8080/${url.shortCode}`} onCopy={() => toast.success('Copied!')}>
                                                    <button className="text-gray-400 hover:text-white transition-all">Copy</button>
                                                </CopyToClipboard>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {!isFetching && urls.length === 0 && (
                            <p className="text-center text-gray-500 py-8">You haven't created any links yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;