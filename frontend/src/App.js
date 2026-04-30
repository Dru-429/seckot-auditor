import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Results } from './pages/Results';
import { useAuth } from './hooks/useAuth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, getCurrentUser, logout } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-3 border-slate-200 border-t-slate-900 rounded-full"
        />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Auth
                onLoginSuccess={() => setIsAuthenticated(true)}
              />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard
                user={user}
                onLogout={() => {
                  logout();
                  setIsAuthenticated(false);
                }}
              />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/results/:scanId"
          element={
            isAuthenticated ? (
              <Results user={user} onBack={() => window.history.back()} />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
