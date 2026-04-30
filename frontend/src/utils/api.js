import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (email, password, role) =>
    api.post('/auth/signup', { email, password, role }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (profileDetails) =>
    api.put('/auth/profile', profileDetails),
};

export const scanAPI = {
  createScan: (githubUrl) =>
    api.post('/scan', { githubUrl }),
  getUserScans: () => api.get('/scan'),
  getScanById: (scanId) =>
    api.get(`/scan/${scanId}`),
  getScanStatus: (scanId) =>
    api.get(`/scan/${scanId}/status`),
  deleteScan: (scanId) =>
    api.delete(`/scan/${scanId}`),
};

export default api;
