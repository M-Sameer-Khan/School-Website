const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();

// Initialize Express app
const app = express();

// Initialize middleware
app.use(helmet()); // Security middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files from the uploads directory
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
const db = require('./models');
db.sequelize
  .sync()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
  });

// Define Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/pages', require('./routes/page.routes'));
app.use('/api/staff', require('./routes/staff.routes'));
app.use('/api/gallery', require('./routes/gallery.routes'));
app.use('/api/alumni', require('./routes/alumni.routes'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || 'An unexpected error occurred on the server.'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
