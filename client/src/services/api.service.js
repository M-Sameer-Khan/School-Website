import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to set auth token
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    
    // Handle authentication errors (401)
    if (response && response.status === 401) {
      // Clear token if it's invalid/expired
      localStorage.removeItem('authToken');
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
