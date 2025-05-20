const db = require('../models');
const fs = require('fs');
const path = require('path');
const Gallery = db.galleries;
const Image = db.images;

// Create and Save a new Gallery
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.title || !req.body.slug) {
      return res.status(400).json({
        message: 'Title and slug are required!'
      });
    }

    // Check if slug already exists
    const existingGallery = await Gallery.findOne({
      where: { slug: req.body.slug }
    });

    if (existingGallery) {
      return res.status(400).json({
        message: 'A gallery with this slug already exists!'
      });
    }

    // Create a new gallery
    const gallery = await Gallery.create({
      title: req.body.title,
      description: req.body.description,
      slug: req.body.slug,
      eventDate: req.body.eventDate,
      tags: req.body.tags || [],
      isPublished: req.body.isPublished || false,
      year: req.body.year,
      sortOrder: req.body.sortOrder || 0
    });

    res.status(201).json({
      message: 'Gallery created successfully!',
      gallery: gallery
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while creating the gallery.'
    });
  }
};

// Retrieve all Galleries
exports.findAll = async (req, res) => {
  try {
    const { year, tag, published, limit, page } = req.query;
    const pageSize = limit ? parseInt(limit) : 10;
    const currentPage = page ? parseInt(page) : 0;
    
    // Build query conditions
    const condition = {};
    
    if (published === 'true') {
      condition.isPublished = true;
    } else if (published === 'false') {
      condition.isPublished = false;
    }
    
    if (year) {
      condition.year = year;
    }
    
    if (tag) {
      condition.tags = { [db.Sequelize.Op.contains]: [tag] };
    }
    
    // Query with pagination
    const { count, rows } = await Gallery.findAndCountAll({
      where: condition,
      limit: pageSize,
      offset: currentPage * pageSize,
      order: [['sortOrder', 'ASC'], ['eventDate', 'DESC']],
      include: [{
        model: Image,
        as: 'images',
        attributes: ['id', 'filename', 'filepath', 'title', 'isFeatured'],
        limit: 1,
        where: { isFeatured: true },
        required: false
      }]
    });
    
    // Calculate total pages
    const totalPages = Math.ceil(count / pageSize);
    
    res.status(200).json({
      galleries: rows,
      totalItems: count,
      totalPages: totalPages,
      currentPage: currentPage
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while retrieving galleries.'
    });
  }
};

// Find a single Gallery by slug
exports.findBySlug = async (req, res) => {
  try {
    const gallery = await Gallery.findOne({
      where: { slug: req.params.slug },
      include: [{
        model: Image,
        as: 'images',
        attributes: ['id', 'title', 'description', 'filename', 'filepath', 'sortOrder', 'isFeatured', 'tags', 'alt'],
        order: [['sortOrder', 'ASC'], ['createdAt', 'DESC']]
      }]
    });
    
    if (!gallery) {
      return res.status(404).json({
        message: `Gallery with slug ${req.params.slug} not found!`
      });
    }
    
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while retrieving the gallery.'
    });
  }
};

// Update a Gallery
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Find gallery
    const gallery = await Gallery.findByPk(id);
    
    if (!gallery) {
      return res.status(404).json({
        message: `Gallery with id ${id} not found!`
      });
    }
    
    // Check slug uniqueness if being updated
    if (req.body.slug && req.body.slug !== gallery.slug) {
      const existingGallery = await Gallery.findOne({
        where: { slug: req.body.slug }
      });
      
      if (existingGallery) {
        return res.status(400).json({
          message: 'A gallery with this slug already exists!'
        });
      }
    }
    
    // Update gallery
    await gallery.update(req.body);
    
    res.status(200).json({
      message: 'Gallery updated successfully!',
      gallery: gallery
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while updating the gallery.'
    });
  }
};

// Delete a Gallery
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Find gallery with associated images
    const gallery = await Gallery.findByPk(id, {
      include: [{
        model: Image,
        as: 'images'
      }]
    });
    
    if (!gallery) {
      return res.status(404).json({
        message: `Gallery with id ${id} not found!`
      });
    }
    
    // Delete associated image files and records
    if (gallery.images && gallery.images.length > 0) {
      for (const image of gallery.images) {
        try {
          // Delete files from filesystem
          const filePath = path.join(__dirname, '../', image.filepath);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          
          // Also try to delete thumbnail if it exists
          const filename = path.basename(image.filename, path.extname(image.filename));
          const thumbnailPath = path.join(
            path.dirname(filePath),
            `${filename}-thumbnail${path.extname(image.filename)}`
          );
          
          if (fs.existsSync(thumbnailPath)) {
            fs.unlinkSync(thumbnailPath);
          }
          
          // Delete image record
          await image.destroy();
        } catch (err) {
          console.error(`Error deleting image ${image.id}:`, err);
          // Continue with other images even if one fails
        }
      }
    }
    
    // Delete gallery
    await gallery.destroy();
    
    res.status(200).json({
      message: 'Gallery deleted successfully!'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while deleting the gallery.'
    });
  }
};

// Add images to a gallery
exports.addImages = async (req, res) => {
  try {
    const galleryId = req.params.id;
    
    // Check if gallery exists
    const gallery = await Gallery.findByPk(galleryId);
    
    if (!gallery) {
      return res.status(404).json({
        message: `Gallery with id ${galleryId} not found!`
      });
    }
    
    // If no processed files, return error
    if (!req.processedFiles || req.processedFiles.length === 0) {
      return res.status(400).json({
        message: 'No images uploaded or processed!'
      });
    }
    
    // Create image records for each processed file
    const imageRecords = [];
    
    for (const processedFile of req.processedFiles) {
      const originalFile = processedFile.originalFile;
      
      const image = await Image.create({
        title: req.body.title || originalFile.originalname,
        description: req.body.description || '',
        filename: processedFile.filename,
        filepath: path.relative(__dirname, processedFile.optimizedPath),
        originalFilename: originalFile.originalname,
        mimetype: originalFile.mimetype,
        size: processedFile.size,
        width: processedFile.width,
        height: processedFile.height,
        tags: req.body.tags ? JSON.parse(req.body.tags) : [],
        alt: req.body.alt || '',
        sortOrder: req.body.sortOrder || 0,
        isFeatured: req.body.isFeatured === 'true',
        galleryId: galleryId
      });
      
      imageRecords.push(image);
    }
    
    // If this is the first image and is featured, set it as the gallery cover
    if (imageRecords.length > 0 && req.body.isFeatured === 'true' && !gallery.coverImagePath) {
      await gallery.update({
        coverImagePath: imageRecords[0].filepath
      });
    }
    
    res.status(201).json({
      message: 'Images added to gallery successfully!',
      images: imageRecords
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while adding images to the gallery.'
    });
  }
};
