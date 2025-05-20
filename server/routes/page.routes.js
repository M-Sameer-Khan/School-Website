const express = require('express');
const router = express.Router();
const pageController = require('../controllers/page.controller');
const { verifyToken, isAdmin, isAdminOrEditor } = require('../middleware/auth');

// Public page routes
router.get('/', pageController.findAll);
router.get('/:slug', pageController.findBySlug);

// Protected page routes - require authentication
router.post('/', isAdminOrEditor, pageController.create);
router.put('/:id', isAdminOrEditor, pageController.update);
router.delete('/:id', isAdmin, pageController.delete);

module.exports = router;
