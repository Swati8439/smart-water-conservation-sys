// src/services/api.js
import axios from 'axios';

// Create an axios instance with default settings
const api = axios.create({
  baseURL: 'http://localhost:8081', // Change this to your backend URL
  timeout: 10000, // Optional: Timeout after 10 seconds
});

// Optional: Set up interceptors to attach token, handle errors, etc.
api.interceptors.request.use(
  (config) => {
    // Attach token to headers if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle errors globally
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default api;
