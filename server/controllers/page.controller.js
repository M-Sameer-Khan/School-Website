const db = require('../models');
const Page = db.pages;

// Create and Save a new Page
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.title || !req.body.slug) {
      return res.status(400).json({
        message: 'Title and slug are required!'
      });
    }

    // Check if slug already exists
    const existingPage = await Page.findOne({
      where: { slug: req.body.slug }
    });

    if (existingPage) {
      return res.status(400).json({
        message: 'A page with this slug already exists!'
      });
    }

    // Create a new page
    const page = await Page.create({
      title: req.body.title,
      slug: req.body.slug,
      content: req.body.content,
      metaTitle: req.body.metaTitle || req.body.title,
      metaDescription: req.body.metaDescription,
      isPublished: req.body.isPublished || false,
      sortOrder: req.body.sortOrder || 0,
      pageType: req.body.pageType || 'custom',
      parentId: req.body.parentId || null
    });

    res.status(201).json({
      message: 'Page created successfully!',
      page: page
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while creating the page.'
    });
  }
};

// Retrieve all Pages
exports.findAll = async (req, res) => {
  try {
    const { published, type, parent, limit, page } = req.query;
    const pageSize = limit ? parseInt(limit) : 10;
    const currentPage = page ? parseInt(page) : 0;
    
    // Build query conditions
    const condition = {};
    
    if (published === 'true') {
      condition.isPublished = true;
    } else if (published === 'false') {
      condition.isPublished = false;
    }
    
    if (type) {
      condition.pageType = type;
    }
    
    if (parent === 'null') {
      condition.parentId = null;
    } else if (parent) {
      condition.parentId = parent;
    }
    
    // Query with pagination
    const { count, rows } = await Page.findAndCountAll({
      where: condition,
      limit: pageSize,
      offset: currentPage * pageSize,
      order: [['sortOrder', 'ASC'], ['title', 'ASC']]
    });
    
    // Calculate total pages
    const totalPages = Math.ceil(count / pageSize);
    
    res.status(200).json({
      pages: rows,
      totalItems: count,
      totalPages: totalPages,
      currentPage: currentPage
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while retrieving pages.'
    });
  }
};

// Find a single Page by slug
exports.findBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug }
    });
    
    if (!page) {
      return res.status(404).json({
        message: `Page with slug ${req.params.slug} not found!`
      });
    }
    
    // For public access, only return published pages
    if (!req.isAdmin && !page.isPublished) {
      return res.status(404).json({
        message: `Page with slug ${req.params.slug} not found!`
      });
    }
    
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while retrieving the page.'
    });
  }
};

// Update a Page
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Find page
    const page = await Page.findByPk(id);
    
    if (!page) {
      return res.status(404).json({
        message: `Page with id ${id} not found!`
      });
    }
    
    // Check slug uniqueness if being updated
    if (req.body.slug && req.body.slug !== page.slug) {
      const existingPage = await Page.findOne({
        where: { slug: req.body.slug }
      });
      
      if (existingPage) {
        return res.status(400).json({
          message: 'A page with this slug already exists!'
        });
      }
    }
    
    // Update page
    await page.update(req.body);
    
    res.status(200).json({
      message: 'Page updated successfully!',
      page: page
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while updating the page.'
    });
  }
};

// Delete a Page
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Check if page has children
    const childrenCount = await Page.count({
      where: { parentId: id }
    });
    
    if (childrenCount > 0) {
      return res.status(400).json({
        message: 'Cannot delete page with child pages. Delete children first or reassign them.'
      });
    }
    
    // Find page
    const page = await Page.findByPk(id);
    
    if (!page) {
      return res.status(404).json({
        message: `Page with id ${id} not found!`
      });
    }
    
    // Delete page
    await page.destroy();
    
    res.status(200).json({
      message: 'Page deleted successfully!'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while deleting the page.'
    });
  }
};
