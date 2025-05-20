const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // Get token from header
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  
  // Check if token exists
  if (!token) {
    return res.status(403).json({
      message: 'No token provided. Authentication required.'
    });
  }

  try {
    // Remove Bearer prefix if present
    const actualToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
    
    // Verify token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET || 'your-secret-key');
    
    // Add user info to request object
    req.userId = decoded.id;
    req.userRole = decoded.role;
    
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized! Invalid or expired token.'
    });
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  // First verify the token
  verifyToken(req, res, async () => {
    try {
      // Get user from database
      const user = await User.findByPk(req.userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      
      // Check if user is admin
      if (user.role !== 'admin') {
        return res.status(403).json({
          message: 'Admin role required!'
        });
      }
      
      next();
    } catch (error) {
      return res.status(500).json({
        message: 'Unable to validate user role.'
      });
    }
  });
};

// Middleware to check if user is admin or editor
const isAdminOrEditor = (req, res, next) => {
  // First verify the token
  verifyToken(req, res, async () => {
    try {
      // Get user from database
      const user = await User.findByPk(req.userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      
      // Check if user is admin or editor
      if (user.role !== 'admin' && user.role !== 'editor') {
        return res.status(403).json({
          message: 'Admin or editor role required!'
        });
      }
      
      next();
    } catch (error) {
      return res.status(500).json({
        message: 'Unable to validate user role.'
      });
    }
  });
};

module.exports = {
  verifyToken,
  isAdmin,
  isAdminOrEditor
};
