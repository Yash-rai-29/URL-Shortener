import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase-config';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ShortenForm from './components/ShortenForm';
import RedirectURL from './components/RedirectURL'; // Import your Redirect component

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe(); // Ensure to unsubscribe on component unmount
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/shorten" element={currentUser ? <ShortenForm userId={currentUser.uid} /> : <Navigate replace to="/login" />} />
          <Route path="/:shortUrl" element={<RedirectURL />} /> {/* Use your Redirect component here */}
          <Route path="/" element={currentUser ? <Dashboard userId={currentUser.uid} /> : <Navigate replace to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
