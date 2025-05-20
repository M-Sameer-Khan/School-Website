import apiClient from './api.service';

class GalleryService {
  // Get all galleries with optional filtering
  getAllGalleries(params) {
    return apiClient.get('/gallery', { params });
  }

  // Get a specific gallery by slug
  getGalleryBySlug(slug) {
    return apiClient.get(`/gallery/${slug}`);
  }

  // Create a new gallery (admin only)
  createGallery(galleryData) {
    return apiClient.post('/gallery', galleryData);
  }

  // Update an existing gallery (admin only)
  updateGallery(id, galleryData) {
    return apiClient.put(`/gallery/${id}`, galleryData);
  }

  // Delete a gallery (admin only)
  deleteGallery(id) {
    return apiClient.delete(`/gallery/${id}`);
  }

  // Upload images to a gallery (admin only)
  uploadImages(galleryId, formData) {
    return apiClient.post(`/gallery/${galleryId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  // Delete an image from a gallery (admin only)
  deleteImage(imageId) {
    return apiClient.delete(`/images/${imageId}`);
  }

  // Update image details (admin only)
  updateImage(imageId, imageData) {
    return apiClient.put(`/images/${imageId}`, imageData);
  }
}

export default new GalleryService();
