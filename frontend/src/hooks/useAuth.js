import { useState, useCallback } from 'react';
import { authAPI } from '../utils/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = useCallback(async (email, password, role) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.signup(email, password, role);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signup failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  const getCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authAPI.getCurrentUser();
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    getCurrentUser,
  };
};
