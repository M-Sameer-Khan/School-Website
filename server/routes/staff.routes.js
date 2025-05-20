const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff.controller');
const { verifyToken, isAdmin, isAdminOrEditor } = require('../middleware/auth');
const { uploadSingle, processImage } = require('../middleware/upload');

// Public staff routes
router.get('/', staffController.findAll);
router.get('/:id', staffController.findOne);

// Protected staff routes - require authentication
router.post(
  '/',
  isAdminOrEditor,
  uploadSingle('profileImage'),
  processImage,
  staffController.create
);

router.put(
  '/:id',
  isAdminOrEditor,
  uploadSingle('profileImage'),
  processImage,
  staffController.update
);

router.delete('/:id', isAdmin, staffController.delete);

module.exports = router;
