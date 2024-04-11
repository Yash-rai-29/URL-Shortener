import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import { incrementClicks } from '../services/urlService';

const Redirect = () => {
  const { shortUrl } = useParams();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      console.log("Short URL from params:", shortUrl); // Log the shortUrl for debugging
      try {
        const q = query(collection(db, 'urls'), where('shortUrl', '==', shortUrl));
        const snapshot = await getDocs(q);
  
        console.log("Snapshot size:", snapshot.size); // Log the number of documents found
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const { longUrl } = doc.data();
          console.log("Found long URL:", longUrl); // Log the found long URL for debugging
          await incrementClicks(shortUrl);
          // Rest of your code...
          window.location.href = 'http://' + longUrl;
        } else {
          console.error('Short URL not found:', shortUrl);
          window.location.href = '/404';
        }
      } catch (error) {
        console.error('Error redirecting:', error);
        window.location.href = '/error';
      }
    };
  
    fetchAndRedirect();
  }, [shortUrl]);

  return null; // Render nothing, as the component will redirect or navigate elsewhere
};

export default Redirect;
