import React from 'react';
import { incrementClicks } from '../services/urlService';

const UrlList = ({ urls }) => {
  const handleClick = async (shortUrl) => {
    await incrementClicks(shortUrl);
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Your Shortened URLs</h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {urls.map((url) => (
            <div key={url.id} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Short URL</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <a href={`/${url.shortUrl}`} onClick={() => handleClick(url.shortUrl)} className="text-blue-500 hover:text-blue-700">
                  {window.location.origin}/{url.shortUrl}
                </a>
              </dd>
              <dt className="text-sm font-medium text-gray-500">Long URL</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{url.longUrl}</dd>
              <dt className="text-sm font-medium text-gray-500">Clicks</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{url.clicks}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default UrlList;
