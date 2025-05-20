const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth');

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', verifyToken, authController.getCurrentUser);
router.post('/change-password', verifyToken, authController.changePassword);

module.exports = router;
