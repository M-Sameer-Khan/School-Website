import apiClient from './api.service';

class StaffService {
  // Get all staff with optional filtering
  getAllStaff(params) {
    return apiClient.get('/staff', { params });
  }

  // Get a specific staff member by ID
  getStaffById(id) {
    return apiClient.get(`/staff/${id}`);
  }

  // Create a new staff member (admin only)
  createStaff(formData) {
    return apiClient.post('/staff', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  // Update an existing staff member (admin only)
  updateStaff(id, formData) {
    return apiClient.put(`/staff/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  // Delete a staff member (admin only)
  deleteStaff(id) {
    return apiClient.delete(`/staff/${id}`);
  }

  // Get staff by department
  getStaffByDepartment(departmentId) {
    return apiClient.get('/staff', { 
      params: { departmentId } 
    });
  }

  // Get all departments
  getAllDepartments() {
    return apiClient.get('/departments');
  }

  // Create a new department (admin only)
  createDepartment(departmentData) {
    return apiClient.post('/departments', departmentData);
  }

  // Update an existing department (admin only)
  updateDepartment(id, departmentData) {
    return apiClient.put(`/departments/${id}`, departmentData);
  }

  // Delete a department (admin only)
  deleteDepartment(id) {
    return apiClient.delete(`/departments/${id}`);
  }
}

export default new StaffService();
