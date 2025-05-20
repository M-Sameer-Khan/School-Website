const db = require('../models');
const fs = require('fs');
const path = require('path');
const Staff = db.staff;
const Department = db.departments;
const Image = db.images;

// Create and Save a new Staff member
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name || !req.body.position) {
      return res.status(400).json({
        message: 'Name and position are required!'
      });
    }

    // Create a new staff member
    const staff = await Staff.create({
      name: req.body.name,
      position: req.body.position,
      bio: req.body.bio,
      email: req.body.email,
      phone: req.body.phone,
      education: req.body.education ? JSON.parse(req.body.education) : [],
      achievements: req.body.achievements ? JSON.parse(req.body.achievements) : [],
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      sortOrder: req.body.sortOrder || 0,
      socialMedia: req.body.socialMedia ? JSON.parse(req.body.socialMedia) : {},
      departmentId: req.body.departmentId
    });

    // If profile image was uploaded and processed
    if (req.processedFiles && req.processedFiles.length > 0) {
      const processedFile = req.processedFiles[0];
      const originalFile = processedFile.originalFile;
      
      // Create image record
      const image = await Image.create({
        title: `${req.body.name} Profile Photo`,
        description: `Profile photo for ${req.body.name}`,
        filename: processedFile.filename,
        filepath: path.relative(__dirname, processedFile.optimizedPath),
        originalFilename: originalFile.originalname,
        mimetype: originalFile.mimetype,
        size: processedFile.size,
        width: processedFile.width,
        height: processedFile.height,
        alt: `${req.body.name}, ${req.body.position}`,
        isFeatured: true
      });
      
      // Update staff with image path
      await staff.update({
        profileImagePath: path.relative(__dirname, processedFile.optimizedPath),
        profileImageId: image.id
      });
    }

    // Fetch the newly created staff with department info
    const staffWithDept = await Staff.findByPk(staff.id, {
      include: [{
        model: Department,
        as: 'department',
        attributes: ['id', 'name']
      }]
    });

    res.status(201).json({
      message: 'Staff member created successfully!',
      staff: staffWithDept
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while creating the staff member.'
    });
  }
};

// Retrieve all Staff members
exports.findAll = async (req, res) => {
  try {
    const { departmentId, active, search, limit, page } = req.query;
    const pageSize = limit ? parseInt(limit) : 10;
    const currentPage = page ? parseInt(page) : 0;
    
    // Build query conditions
    let condition = {};
    
    if (departmentId) {
      condition.departmentId = departmentId;
    }
    
    if (active === 'true') {
      condition.isActive = true;
    } else if (active === 'false') {
      condition.isActive = false;
    }
    
    if (search) {
      condition[db.Sequelize.Op.or] = [
        { name: { [db.Sequelize.Op.iLike]: `%${search}%` } },
        { position: { [db.Sequelize.Op.iLike]: `%${search}%` } },
        { bio: { [db.Sequelize.Op.iLike]: `%${search}%` } }
      ];
    }
    
    // Query with pagination
    const { count, rows } = await Staff.findAndCountAll({
      where: condition,
      limit: pageSize,
      offset: currentPage * pageSize,
      order: [['sortOrder', 'ASC'], ['name', 'ASC']],
      include: [{
        model: Department,
        as: 'department',
        attributes: ['id', 'name', 'slug']
      }]
    });
    
    // Calculate total pages
    const totalPages = Math.ceil(count / pageSize);
    
    res.status(200).json({
      staff: rows,
      totalItems: count,
      totalPages: totalPages,
      currentPage: currentPage
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while retrieving staff members.'
    });
  }
};

// Find a single Staff member by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    
    const staff = await Staff.findByPk(id, {
      include: [{
        model: Department,
        as: 'department',
        attributes: ['id', 'name', 'slug']
      }]
    });
    
    if (!staff) {
      return res.status(404).json({
        message: `Staff member with id ${id} not found!`
      });
    }
    
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while retrieving the staff member.'
    });
  }
};

// Update a Staff member
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Find staff member
    const staff = await Staff.findByPk(id);
    
    if (!staff) {
      return res.status(404).json({
        message: `Staff member with id ${id} not found!`
      });
    }
    
    // Format data for update
    const updateData = {
      ...req.body,
      education: req.body.education ? JSON.parse(req.body.education) : undefined,
      achievements: req.body.achievements ? JSON.parse(req.body.achievements) : undefined,
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
        title: `${staff.name} Profile Photo`,
        description: `Profile photo for ${staff.name}`,
        filename: processedFile.filename,
        filepath: path.relative(__dirname, processedFile.optimizedPath),
        originalFilename: originalFile.originalname,
        mimetype: originalFile.mimetype,
        size: processedFile.size,
        width: processedFile.width,
        height: processedFile.height,
        alt: `${staff.name}, ${staff.position}`,
        isFeatured: true
      });
      
      // Delete old profile image if exists
      if (staff.profileImagePath) {
        try {
          const oldImagePath = path.join(__dirname, '..', staff.profileImagePath);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        } catch (err) {
          console.error('Error deleting old profile image:', err);
          // Continue even if delete fails
        }
      }
      
      // Update staff with new image info
      updateData.profileImagePath = path.relative(__dirname, processedFile.optimizedPath);
      updateData.profileImageId = image.id;
    }
    
    // Update staff member
    await staff.update(updateData);
    
    // Fetch updated staff with department info
    const updatedStaff = await Staff.findByPk(id, {
      include: [{
        model: Department,
        as: 'department',
        attributes: ['id', 'name', 'slug']
      }]
    });
    
    res.status(200).json({
      message: 'Staff member updated successfully!',
      staff: updatedStaff
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while updating the staff member.'
    });
  }
};

// Delete a Staff member
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Find staff member
    const staff = await Staff.findByPk(id);
    
    if (!staff) {
      return res.status(404).json({
        message: `Staff member with id ${id} not found!`
      });
    }
    
    // Delete profile image if exists
    if (staff.profileImagePath) {
      try {
        const imagePath = path.join(__dirname, '..', staff.profileImagePath);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
        
        // Also delete thumbnail if it exists
        const filename = path.basename(staff.profileImagePath, path.extname(staff.profileImagePath));
        const thumbnailPath = path.join(
          path.dirname(imagePath),
          `${filename}-thumbnail${path.extname(staff.profileImagePath)}`
        );
        
        if (fs.existsSync(thumbnailPath)) {
          fs.unlinkSync(thumbnailPath);
        }
        
        // Delete image record if exists
        if (staff.profileImageId) {
          await Image.destroy({ where: { id: staff.profileImageId } });
        }
      } catch (err) {
        console.error('Error deleting profile image:', err);
        // Continue even if delete fails
      }
    }
    
    // Delete staff member
    await staff.destroy();
    
    res.status(200).json({
      message: 'Staff member deleted successfully!'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while deleting the staff member.'
    });
  }
};
