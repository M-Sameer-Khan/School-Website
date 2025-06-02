/**
 * Service for handling fee management API calls
 */

const API_BASE_URL = 'http://127.0.0.1:5000/api';

export const feeService = {
  // Get all students with basic information
  getAllStudents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },
  
  // Get detailed information about a specific student
  getStudentDetails: async (studentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch student with ID ${studentId}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching student ${studentId}:`, error);
      throw error;
    }
  },
  
  // Get all fee payments with optional filtering
  getFeePayments: async (filters = {}) => {
    try {
      // Build query string from filters
      const queryParams = new URLSearchParams();
      if (filters.month) queryParams.append('month', filters.month);
      if (filters.year) queryParams.append('year', filters.year);
      if (filters.class) queryParams.append('class', filters.class);
      
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      
      const response = await fetch(`${API_BASE_URL}/fee-payments${queryString}`, {
        method: 'GET',
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch fee payments');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching fee payments:', error);
      throw error;
    }
  }
};

export default feeService;
