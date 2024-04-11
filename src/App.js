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
    return (
      <div className="z-10 fixed top-0 left-0 w-full h-full bg-blue-500 flex justify-center items-center">
        <div className="w-64 h-4 bg-red-400 rounded-full">
          <div className="h-full bg-orange-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
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
