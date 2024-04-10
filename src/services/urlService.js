import { db } from '../firebase-config';
import { collection, addDoc, query, where, getDocs, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { nanoid } from 'nanoid';

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

export const incrementClicks = async (shortUrl) => {
  const urlRef = query(collection(db, 'urls'), where('shortUrl', '==', shortUrl));
  const snapshot = await getDocs(urlRef);
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    await updateDoc(doc.ref, { clicks: increment(1) });
  }
};

export const fetchUrlsForUser = async (userId) => {
  const urls = [];
  const q = query(collection(db, 'urls'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  snapshot.forEach(doc => urls.push({ id: doc.id, ...doc.data() }));
  return urls;
};
