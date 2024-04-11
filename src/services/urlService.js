import { db } from '../firebase-config';
import { collection, addDoc, query, where, getDocs, updateDoc, increment, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { nanoid } from 'nanoid';

// Function to shorten a URL
export const shortenUrl = async (longUrl, userId) => {
  const shortUrl = nanoid(7);
  const newUrl = {
    longUrl,
    shortUrl,
    userId,
    clicks: 0,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, 'urls'), newUrl);
  return { ...newUrl, id: docRef.id };
};

// Function to increment clicks for a given short URL
export const incrementClicks = async (shortUrl) => {
  const urlRef = query(collection(db, 'urls'), where('shortUrl', '==', shortUrl));
  const snapshot = await getDocs(urlRef);

  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    await updateDoc(doc.ref, { clicks: increment(1) });
  } else {
    console.error(`No document found for shortUrl: ${shortUrl}`);
    throw new Error(`No document found for shortUrl: ${shortUrl}`);
  }
};

// Function to fetch URLs for a specific user
export const fetchUrlsForUser = async (userId) => {
  const urls = [];
  const q = query(collection(db, 'urls'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  snapshot.forEach(doc => urls.push({ id: doc.id, ...doc.data() }));
  return urls;
};

// Function to delete a URL
export const deleteUrl = async (urlId) => {
  try {
    await deleteDoc(doc(db, 'urls', urlId));
    console.log(`URL with ID ${urlId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting URL with ID ${urlId}:`, error);
    throw new Error(`Error deleting URL with ID ${urlId}: ${error.message}`);
  }
};