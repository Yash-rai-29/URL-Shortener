import { auth } from '../firebase-config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  setPersistence, 
  browserSessionPersistence,
  onIdTokenChanged
} from "firebase/auth";

// Enhanced security: Abstract token management to avoid direct cookie manipulation here
import { setAuthToken, clearAuthToken } from './tokenService';

// Register user with session persistence
export const registerUser = async (email, password) => {
  await setPersistence(auth, browserSessionPersistence);
  return createUserWithEmailAndPassword(auth, email, password);
};

// Login user with session persistence
export const loginUser = async (email, password) => {
  await setPersistence(auth, browserSessionPersistence);
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  userCredential.user.getIdToken().then(token => {
    setAuthToken(token); // Use abstracted service for setting token
  });
  return userCredential;
};

// Logout user and handle session cleanup
export const logoutUser = async () => {
  await signOut(auth);
  clearAuthToken(); // Use abstracted service for clearing token
};

// Token management service abstraction
onIdTokenChanged(auth, (user) => {
  if (user) {
    user.getIdToken().then(setAuthToken);
  } else {
    clearAuthToken();
  }
});

// Send email verification
export const sendEmailVerification = async (user) => {
  await sendEmailVerification(user);
};