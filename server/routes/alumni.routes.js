const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumni.controller');
const { verifyToken, isAdmin, isAdminOrEditor } = require('../middleware/auth');
const { uploadSingle, processImage } = require('../middleware/upload');

// Public alumni routes
router.get('/', alumniController.findAll);
router.get('/:id', alumniController.findOne);

// Protected alumni routes - require authentication
router.post(
  '/',
  isAdminOrEditor,
  uploadSingle('profileImage'),
  processImage,
  alumniController.create
);

router.put(
  '/:id',
  isAdminOrEditor,
  uploadSingle('profileImage'),
  processImage,
  alumniController.update
);

router.delete('/:id', isAdmin, alumniController.delete);

module.exports = router;
