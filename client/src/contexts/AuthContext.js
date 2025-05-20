import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Check if user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchCurrentUser(token);
    } else {
      setLoading(false);
    }
  }, []);
  
  // Fetch current user data using token
  const fetchCurrentUser = async (token) => {
    try {
      // Set auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const response = await axios.get('/api/auth/me');
      setCurrentUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user:', error);
      logout(); // Invalid token or other error
      setLoading(false);
    }
  };
  
  // Login function
  const login = async (username, password) => {
    try {
      setError('');
      setLoading(true);
      
      const response = await axios.post('/api/auth/login', { username, password });
      
      // Store token in local storage
      localStorage.setItem('authToken', response.data.token);
      
      // Set auth header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      setCurrentUser(response.data.user);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      
      const message = 
        error.response?.data?.message ||
        'An error occurred during login. Please try again.';
      
      setError(message);
      throw new Error(message);
    }
  };
  
  // Logout function
  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem('authToken');
    
    // Remove auth header
    delete axios.defaults.headers.common['Authorization'];
    
    setCurrentUser(null);
  };
  
  // Register function
  const register = async (userData) => {
    try {
      setError('');
      setLoading(true);
      
      const response = await axios.post('/api/auth/register', userData);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      
      const message = 
        error.response?.data?.message ||
        'An error occurred during registration. Please try again.';
      
      setError(message);
      throw new Error(message);
    }
  };
  
  // Change password function
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setError('');
      setLoading(true);
      
      const response = await axios.post('/api/auth/change-password', {
        currentPassword,
        newPassword
      });
      
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      
      const message = 
        error.response?.data?.message ||
        'An error occurred while changing password. Please try again.';
      
      setError(message);
      throw new Error(message);
    }
  };
  
  // Provide values and functions
  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    register,
    changePassword
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
