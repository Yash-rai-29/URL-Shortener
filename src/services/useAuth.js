import { useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from "firebase/auth";

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setCheckingSession(false);
    });

    return () => unsubscribe();
  }, []);

  return { currentUser, checkingSession };
};
