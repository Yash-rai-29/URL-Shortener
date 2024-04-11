import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ShortenForm from './components/ShortenForm';
import RedirectURL from './components/RedirectURL';
import { useAuth } from './services/useAuth'; // Custom hook for authentication

const App = () => {
  const { currentUser, checkingSession } = useAuth(); // Utilize custom hook

  if (checkingSession) {
    return <div>Loading...</div>; // Consider a more engaging loading indicator
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <Routes>
          <Route path="/:shortUrl" element={<RedirectURL />} />
          <Route path="/login" element={!currentUser ? <LoginForm /> : <Navigate to="/" />} />
          <Route path="/register" element={!currentUser ? <RegisterForm /> : <Navigate to="/" />} />
          <Route path="/shorten" element={currentUser ? <ShortenForm userId={currentUser.uid} /> : <Navigate replace to="/login" />} />
          <Route path="/" element={currentUser ? <Dashboard userId={currentUser.uid} /> : <Navigate replace to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
