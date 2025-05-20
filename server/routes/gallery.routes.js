const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/gallery.controller');
const { verifyToken, isAdmin, isAdminOrEditor } = require('../middleware/auth');
const { upload, processImage } = require('../middleware/upload');

// Public gallery routes
router.get('/', galleryController.findAll);
router.get('/:slug', galleryController.findBySlug);

// Protected gallery routes
router.post('/', isAdminOrEditor, galleryController.create);
router.put('/:id', isAdminOrEditor, galleryController.update);
router.delete('/:id', isAdmin, galleryController.delete);

// Image upload route - requires authentication
router.post(
  '/:id/images',
  isAdminOrEditor,
  upload.array('images', 10), // Allow up to 10 images
  processImage,
  galleryController.addImages
);

module.exports = router;
