import React, { useState } from 'react';
import { shortenUrl } from '../services/urlService';

const ShortenForm = ({ userId, onUrlShortened }) => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await shortenUrl(longUrl, userId);
      if (result.shortUrl) {
        setShortUrl(result.shortUrl);
        setLongUrl('');
        setError('');
        onUrlShortened(result);
      } else {
        throw new Error('Invalid response from the server.');
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      setError('Failed to shorten URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden sm:rounded-lg w-full max-w-md mx-auto p-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4 p-4">Shorten a URL</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="long-url" className="m-8 p-4 block text-sm font-medium text-gray-700">
            Long URL
          </label>
          <input
            type="text"
            id="long-url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="mt-2 mb-2 border-spacing-3 h-4 p-3 border border-solid focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="https://example.com/long-url"
            required
          />
        </div>
        {shortUrl && (
          <div>
            <label htmlFor="short-url" className="block text-sm font-medium text-gray-700 mt-2 mb-2">
              Short URL
            </label>
            <input
              type="text"
              id="short-url"
              value={`${window.location.origin}/${shortUrl}`}
              readOnly
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        )}
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {loading ? 'Loading...' : 'Shorten URL'}
        </button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
      {loading && (
        <div className="flex justify-center mt-4">
          <div className="w-8 h-8 border-2 border-indigo-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ShortenForm;
