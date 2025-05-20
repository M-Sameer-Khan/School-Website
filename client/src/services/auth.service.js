import apiClient from './api.service';

class AuthService {
  // Login user
  login(credentials) {
    return apiClient.post('/auth/login', credentials);
  }

  // Register new user (admin only)
  register(userData) {
    return apiClient.post('/auth/register', userData);
  }

  // Get current user details
  getCurrentUser() {
    return apiClient.get('/auth/me');
  }

  // Change user password
  changePassword(passwordData) {
    return apiClient.post('/auth/change-password', passwordData);
  }

  // Logout by clearing token (client-side only)
  logout() {
    localStorage.removeItem('authToken');
  }

  // Check if user is logged in
  isLoggedIn() {
    return !!localStorage.getItem('authToken');
  }

  // Get auth token
  getToken() {
    return localStorage.getItem('authToken');
  }

  // Set auth token
  setToken(token) {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }
}

export default new AuthService();
