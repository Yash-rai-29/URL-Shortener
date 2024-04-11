// Dashboard.js
import React, { useEffect, useState } from 'react';
import { fetchUrlsForUser, deleteUrl } from '../services/urlService';
import { logoutUser } from '../services/authService';
import UrlList from './UrlList';
import { useNavigate } from 'react-router-dom';
import ShortenForm from './ShortenForm';

const Dashboard = ({ userId }) => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const userUrls = await fetchUrlsForUser(userId);
        setUrls(userUrls);
      } catch (error) {
        console.error('Error fetching URLs:', error);
        setError('Failed to fetch URLs. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, [userId]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Failed to log out. Please try again.');
    }
  };

  const handleDelete = async (urlId) => {
    try {
      await deleteUrl(urlId);
      setUrls((prevUrls) => prevUrls.filter((url) => url.id !== urlId));
    } catch (error) {
      console.error('Error deleting URL:', error);
      setError('Failed to delete URL. Please try again.');
    }
  };

  const handleUrlShortened = (newUrl) => {
    if (newUrl) {
      setUrls((prevUrls) => [...prevUrls, newUrl]);
    } else {
      setError('Failed to shorten URL. Please try again.');
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full max-w-4xl mx-auto">
      <div className="px-4 py-5 sm:p-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Your Dashboard</h3>
        <button onClick={handleLogout} className="...">
          Logout
        </button>
      </div>
      <ShortenForm userId={userId} onUrlShortened={handleUrlShortened} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <UrlList urls={urls} onDelete={handleDelete} />
      )}
      {error && <p className="text-red-500 p-4">{error}</p>}
    </div>
  );
};

export default Dashboard;