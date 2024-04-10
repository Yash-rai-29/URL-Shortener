import React, { useEffect, useState } from 'react';
import { fetchUrlsForUser } from '../services/urlService';
import { logoutUser } from '../services/authService';
import UrlList from './UrlList';
import { useNavigate } from 'react-router-dom';
import ShortenForm from './ShortenForm';

const Dashboard = ({ userId }) => {
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();
  const onUrlShortened = (newUrl) => {
    setUrls((prevUrls) => [...prevUrls, newUrl]);
  };
  useEffect(() => {
    const fetchUrls = async () => {
      const userUrls = await fetchUrlsForUser(userId);
      setUrls(userUrls);
    };
    fetchUrls();
  }, [userId]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      // Display error message to the user
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
    <ShortenForm userId={userId} onUrlShortened={onUrlShortened} />
    <UrlList urls={urls} />
  </div>
  );
};

export default Dashboard;
