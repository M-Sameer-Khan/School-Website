const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;

// User registration
exports.register = async (req, res) => {
  try {
    // Validate request
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'Username, email, and password are required!'
      });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { username: req.body.username },
          { email: req.body.email }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Username or email already in use!'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || 'viewer' // Default role
    });

    // Remove password from response
    const userResponse = { ...user.get() };
    delete userResponse.password;

    res.status(201).json({
      message: 'User registered successfully!',
      user: userResponse
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while registering the user.'
    });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    // Validate request
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        message: 'Username and password are required!'
      });
    }

    // Find user by username
    const user = await User.scope('withPassword').findOne({
      where: { username: req.body.username }
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found!'
      });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid password!'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' } // Token expires in 24 hours
    );

    // Update last login
    await user.update({ lastLogin: new Date() });

    // Remove password from response
    const userResponse = { ...user.get() };
    delete userResponse.password;

    res.status(200).json({
      message: 'Login successful!',
      user: userResponse,
      token: token
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred during login.'
    });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found!'
      });
    }

    res.status(200).json({
      user: user
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while retrieving user.'
    });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    // Validate request
    if (!req.body.currentPassword || !req.body.newPassword) {
      return res.status(400).json({
        message: 'Current password and new password are required!'
      });
    }

    // Find user
    const user = await User.scope('withPassword').findByPk(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found!'
      });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(req.body.currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Current password is incorrect!'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    // Update password
    await user.update({ password: hashedPassword });

    res.status(200).json({
      message: 'Password changed successfully!'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while changing password.'
    });
  }
};
