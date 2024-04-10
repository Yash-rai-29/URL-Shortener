import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import { incrementClicks } from '../services/urlService';

const Redirect = () => {
  const { shortUrl } = useParams();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const q = query(collection(db, 'urls'), where('shortUrl', '==', shortUrl));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const { longUrl } = doc.data();
          await incrementClicks(shortUrl); // Ensure this function correctly updates Firestore
          
          // Check if the URL starts with http:// or https://, prepend http:// if not
          const protocolPattern = /^https?:\/\//i;
          const correctedUrl = protocolPattern.test(longUrl) ? longUrl : `http://${longUrl}`;

          window.location.href = correctedUrl;
        } else {
          // Handle case where short URL is not found
          window.location.href = '/'; // Navigate to home page or a custom 404 page
        }
      } catch (error) {
        console.error('Error redirecting:', error);
        window.location.href = '/'; // Navigate to home page or error page on exception
      }
    };

    fetchAndRedirect();
  }, [shortUrl]); // Removed db from dependencies as it's likely a constant

  return null; // Render nothing, as the component will redirect or navigate elsewhere
};

export default Redirect;
