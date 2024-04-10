import { auth } from '../firebase-config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  setPersistence, 
  browserSessionPersistence,
  onIdTokenChanged
} from "firebase/auth";
import Cookies from 'js-cookie';

// Register user with session persistence
export const registerUser = async (email, password) => {
  await setPersistence(auth, browserSessionPersistence);
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  // No need to manually manage tokens for session persistence here
  return userCredential;
};

// Login user with session persistence and manage token via cookie
export const loginUser = async (email, password) => {
  await setPersistence(auth, browserSessionPersistence);
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  // Firebase handles session tokens internally. Optionally handle custom tokens or session indicators here.
  userCredential.user.getIdToken().then(token => {
    // You can use this token for your own backend if needed
    Cookies.set('authToken', token, { expires: 7 }); // Example: setting a cookie with the token
  });
  return userCredential;
};

// Logout user and handle session cleanup
export const logoutUser = async () => {
  await signOut(auth);
  // Clear any custom session management or token storage here
  Cookies.remove('authToken'); // Remove the token cookie
};

// Optionally, listen for auth state changes and token updates
onIdTokenChanged(auth, (user) => {
  if (user) {
    user.getIdToken().then(token => {
      // Update the token in your storage (e.g., cookies) as needed
      Cookies.set('authToken', token, { expires: 7 });
    });
  } else {
    // Handle user logout or token expiration
    Cookies.remove('authToken');
  }
});
