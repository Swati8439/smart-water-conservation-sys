// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './components/Dashboard';
import PersonalizedTips from './components/PersonalizedTips';
import UserProfile from './components/UserProfile';
import HelpCenter from './components/HelpCenter';
import './styles/main.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/personalizedtips" element={<PersonalizedTips />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/helpcenter" element={<HelpCenter />} />
      </Routes>
    </Router>
  );
}

export default App;
