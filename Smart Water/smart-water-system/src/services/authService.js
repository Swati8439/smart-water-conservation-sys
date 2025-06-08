// src/services/authService.js
import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    // Save token and return user data, token can be returned if needed
    localStorage.setItem('authToken', token);
    return { user };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await api.post('/auth/signup', { name, email, password });
    const { token, user } = response.data;
    localStorage.setItem('authToken', token);
    return { user };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};
export const logout = () => {
  localStorage.removeItem('authToken');
};
