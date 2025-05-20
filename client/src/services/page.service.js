import apiClient from './api.service';

class PageService {
  // Get all pages with optional filtering
  getAllPages(params) {
    return apiClient.get('/pages', { params });
  }

  // Get a specific page by slug
  getPageBySlug(slug) {
    return apiClient.get(`/pages/${slug}`);
  }

  // Create a new page (admin only)
  createPage(pageData) {
    return apiClient.post('/pages', pageData);
  }

  // Update an existing page (admin only)
  updatePage(id, pageData) {
    return apiClient.put(`/pages/${id}`, pageData);
  }

  // Delete a page (admin only)
  deletePage(id) {
    return apiClient.delete(`/pages/${id}`);
  }

  // Get pages by type
  getPagesByType(type) {
    return apiClient.get('/pages', { 
      params: { type } 
    });
  }

  // Get child pages of a parent page
  getChildPages(parentId) {
    return apiClient.get('/pages', { 
      params: { parent: parentId } 
    });
  }
}

export default new PageService();
