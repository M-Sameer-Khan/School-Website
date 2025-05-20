const db = require('../models');
const fs = require('fs');
const path = require('path');
const Alumni = db.alumni;
const Image = db.images;

// Create and Save a new Alumni
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name || !req.body.graduationYear) {
      return res.status(400).json({
        message: 'Name and graduation year are required!'
      });
    }

    // Create a new alumni
    const alumni = await Alumni.create({
      name: req.body.name,
      graduationYear: req.body.graduationYear,
      bio: req.body.bio,
      email: req.body.email,
      profession: req.body.profession,
      company: req.body.company,
      achievements: req.body.achievements ? JSON.parse(req.body.achievements) : [],
      education: req.body.education ? JSON.parse(req.body.education) : [],
      testimonial: req.body.testimonial,
      isPublished: req.body.isPublished !== undefined ? req.body.isPublished : false,
      socialMedia: req.body.socialMedia ? JSON.parse(req.body.socialMedia) : {},
      sortOrder: req.body.sortOrder || 0
    });

    // If profile image was uploaded and processed
    if (req.processedFiles && req.processedFiles.length > 0) {
      const processedFile = req.processedFiles[0];
      const originalFile = processedFile.originalFile;
      
      // Create image record
      const image = await Image.create({
        title: `${req.body.name} Profile Photo`,
        description: `Profile photo for ${req.body.name}, Class of ${req.body.graduationYear}`,
        filename: processedFile.filename,
        filepath: path.relative(__dirname, processedFile.optimizedPath),
        originalFilename: originalFile.originalname,
        mimetype: originalFile.mimetype,
        size: processedFile.size,
        width: processedFile.width,
        height: processedFile.height,
        alt: `${req.body.name}, Class of ${req.body.graduationYear}`,
        isFeatured: true
      });
      
      // Update alumni with image path
      await alumni.update({
        profileImagePath: path.relative(__dirname, processedFile.optimizedPath),
        profileImageId: image.id
      });
    }

    res.status(201).json({
      message: 'Alumni created successfully!',
      alumni: alumni
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while creating the alumni.'
    });
  }
};

// Retrieve all Alumni with filtering options
exports.findAll = async (req, res) => {
  try {
    const { graduationYear, search, published, limit, page } = req.query;
    const pageSize = limit ? parseInt(limit) : 10;
    const currentPage = page ? parseInt(page) : 0;
    
    // Build query conditions
    let condition = {};
    
    if (graduationYear) {
      condition.graduationYear = graduationYear;
    }
    
    if (published === 'true') {
      condition.isPublished = true;
    } else if (published === 'false') {
      condition.isPublished = false;
    }
    
    if (search) {
      condition[db.Sequelize.Op.or] = [
        { name: { [db.Sequelize.Op.iLike]: `%${search}%` } },
        { profession: { [db.Sequelize.Op.iLike]: `%${search}%` } },
        { company: { [db.Sequelize.Op.iLike]: `%${search}%` } },
        { bio: { [db.Sequelize.Op.iLike]: `%${search}%` } }
      ];
    }
    
    // Query with pagination
    const { count, rows } = await Alumni.findAndCountAll({
      where: condition,
      limit: pageSize,
      offset: currentPage * pageSize,
      order: [['graduationYear', 'DESC'], ['name', 'ASC']]
    });
    
    // Calculate total pages
    const totalPages = Math.ceil(count / pageSize);
    
    res.status(200).json({
      alumni: rows,
      totalItems: count,
      totalPages: totalPages,
      currentPage: currentPage
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while retrieving alumni.'
    });
  }
};

// Find a single Alumni by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    
    const alumni = await Alumni.findByPk(id);
    
    if (!alumni) {
      return res.status(404).json({
        message: `Alumni with id ${id} not found!`
      });
    }
    
    res.status(200).json(alumni);
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while retrieving the alumni.'
    });
  }
};

// Update an Alumni
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Find alumni
    const alumni = await Alumni.findByPk(id);
    
    if (!alumni) {
      return res.status(404).json({
        message: `Alumni with id ${id} not found!`
      });
    }
    
    // Format data for update
    const updateData = {
      ...req.body,
      achievements: req.body.achievements ? JSON.parse(req.body.achievements) : undefined,
      education: req.body.education ? JSON.parse(req.body.education) : undefined,
      socialMedia: req.body.socialMedia ? JSON.parse(req.body.socialMedia) : undefined
    };
    
    // Remove undefined fields
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });
    
    // Process new profile image if uploaded
    if (req.processedFiles && req.processedFiles.length > 0) {
      const processedFile = req.processedFiles[0];
      const originalFile = processedFile.originalFile;
      
      // Create new image record
      const image = await Image.create({
        title: `${alumni.name} Profile Photo`,
        description: `Profile photo for ${alumni.name}, Class of ${alumni.graduationYear}`,
        filename: processedFile.filename,
        filepath: path.relative(__dirname, processedFile.optimizedPath),
        originalFilename: originalFile.originalname,
        mimetype: originalFile.mimetype,
        size: processedFile.size,
        width: processedFile.width,
        height: processedFile.height,
        alt: `${alumni.name}, Class of ${alumni.graduationYear}`,
        isFeatured: true
      });
      
      // Delete old profile image if exists
      if (alumni.profileImagePath) {
        try {
          const oldImagePath = path.join(__dirname, '..', alumni.profileImagePath);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        } catch (err) {
          console.error('Error deleting old profile image:', err);
          // Continue even if delete fails
        }
      }
      
      // Update alumni with new image info
      updateData.profileImagePath = path.relative(__dirname, processedFile.optimizedPath);
      updateData.profileImageId = image.id;
    }
    
    // Update alumni
    await alumni.update(updateData);
    
    res.status(200).json({
      message: 'Alumni updated successfully!',
      alumni: alumni
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while updating the alumni.'
    });
  }
};

// Delete an Alumni
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Find alumni
    const alumni = await Alumni.findByPk(id);
    
    if (!alumni) {
      return res.status(404).json({
        message: `Alumni with id ${id} not found!`
      });
    }
    
    // Delete profile image if exists
    if (alumni.profileImagePath) {
      try {
        const imagePath = path.join(__dirname, '..', alumni.profileImagePath);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
        
        // Also delete thumbnail if it exists
        const filename = path.basename(alumni.profileImagePath, path.extname(alumni.profileImagePath));
        const thumbnailPath = path.join(
          path.dirname(imagePath),
          `${filename}-thumbnail${path.extname(alumni.profileImagePath)}`
        );
        
        if (fs.existsSync(thumbnailPath)) {
          fs.unlinkSync(thumbnailPath);
        }
        
        // Delete image record if exists
        if (alumni.profileImageId) {
          await Image.destroy({ where: { id: alumni.profileImageId } });
        }
      } catch (err) {
        console.error('Error deleting profile image:', err);
        // Continue even if delete fails
      }
    }
    
    // Delete alumni
    await alumni.destroy();
    
    res.status(200).json({
      message: 'Alumni deleted successfully!'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while deleting the alumni.'
    });
  }
};
