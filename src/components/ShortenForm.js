import React, { useState } from 'react';
import { shortenUrl } from '../services/urlService';

const ShortenForm = ({ userId }) => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState(''); // Add state for error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Attempt to shorten the URL
      const result = await shortenUrl(longUrl, userId);
      if (result.shortUrl) {
        setShortUrl(result.shortUrl); // Update state with just the shortUrl string
        setLongUrl(''); // Reset longUrl input field
        setError(''); // Clear any previous errors
      } else {
        throw new Error('Invalid response from the server.');
      }
    } catch (error) {
      // Handle errors (e.g., network issues, server errors)
      console.error('Error shortening URL:', error);
      setError('Failed to shorten URL. Please try again.'); // Provide feedback to the user
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full max-w-md mx-auto">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Shorten a URL</h3>
        <form onSubmit={handleSubmit} className="mt-5 space-y-6">
          <div>
            <label htmlFor="long-url" className="block text-sm font-medium text-gray-700">
              Long URL
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="long-url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="https://example.com/long-url"
                required
              />
            </div>
          </div>
          {shortUrl && (
            <div>
              <label htmlFor="short-url" className="block text-sm font-medium text-gray-700">
                Short URL
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="short-url"
                  value={`${window.location.origin}/${shortUrl}`}
                  readOnly
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Shorten URL
          </button>
          {error && <p className="text-sm text-red-500">{error}</p>} {/* Display any error messages */}
        </form>
      </div>
    </div>
  );
};

export default ShortenForm;
