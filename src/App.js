import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase-config';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ShortenForm from './components/ShortenForm';
import RedirectURL from './components/RedirectURL';
import Cookies from 'js-cookie';
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true); // State to manage session checking

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
      } else {
        // User is signed out. Check the cookie as an additional condition (if needed for your logic).
        const authToken = Cookies.get('authToken');
        if (!authToken) {
          setCurrentUser(null);
        }
        // Note: The presence of a token doesn't guarantee a valid session in Firebase
      }
      setCheckingSession(false); // Indicate that session checking is complete
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  if (checkingSession) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <Routes>
          <Route path="/login" element={!currentUser ? <LoginForm /> : <Navigate to="/" />} />
          <Route path="/register" element={!currentUser ? <RegisterForm /> : <Navigate to="/" />} />
          <Route path="/shorten" element={currentUser ? <ShortenForm userId={currentUser.uid} /> : <Navigate replace to="/login" />} />
          <Route path="/:shortUrl" element={<RedirectURL />} />
          <Route path="/" element={currentUser ? <Dashboard userId={currentUser.uid} /> : <Navigate replace to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
