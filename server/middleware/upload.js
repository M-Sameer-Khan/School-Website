const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Configure storage strategy for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine upload directory based on specified type
    const type = req.params.type || req.body.type || 'gallery';
    const validTypes = ['gallery', 'staff', 'alumni'];
    const uploadType = validTypes.includes(type) ? type : 'gallery';
    
    const dir = path.join(__dirname, '../uploads', uploadType);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

// Filter function to validate image types
const imageFilter = (req, file, cb) => {
  // Allow only image files
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Configure multer upload
const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10 // maximum 10 files per upload
  }
});

// Middleware for processing uploaded images (resizing, optimization)
const processImage = async (req, res, next) => {
  // If no file is uploaded, skip processing
  if (!req.file && (!req.files || req.files.length === 0)) {
    return next();
  }
  
  try {
    const files = req.files || [req.file];
    const processedFiles = [];
    
    // Process each uploaded file
    for (const file of files) {
      const filename = path.basename(file.filename, path.extname(file.filename));
      const outputPath = path.join(file.destination, `${filename}-optimized${path.extname(file.filename)}`);
      
      // Get image metadata first
      const metadata = await sharp(file.path).metadata();
      
      // Resize and optimize image
      await sharp(file.path)
        .resize({
          width: Math.min(metadata.width, 1200), // Limit max width to 1200px
          height: Math.min(metadata.height, 1200), // Limit max height to 1200px
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 80, progressive: true })
        .toFile(outputPath);
      
      // Create thumbnail version
      const thumbnailPath = path.join(file.destination, `${filename}-thumbnail${path.extname(file.filename)}`);
      await sharp(file.path)
        .resize({
          width: 300,
          height: 300,
          fit: 'cover'
        })
        .jpeg({ quality: 70 })
        .toFile(thumbnailPath);
      
      // Add processed file info to the array
      processedFiles.push({
        originalFile: file,
        optimizedPath: outputPath,
        thumbnailPath: thumbnailPath,
        filename: `${filename}-optimized${path.extname(file.filename)}`,
        thumbnailFilename: `${filename}-thumbnail${path.extname(file.filename)}`,
        width: metadata.width,
        height: metadata.height,
        mimetype: file.mimetype,
        size: fs.statSync(outputPath).size
      });
    }
    
    // Attach processed files to the request object
    req.processedFiles = processedFiles;
    next();
  } catch (error) {
    next(error);
  }
};

// Create a module that exports different upload configurations
module.exports = {
  upload,
  processImage,
  uploadSingle: (fieldName = 'image') => upload.single(fieldName),
  uploadMultiple: (fieldName = 'images', maxCount = 10) => upload.array(fieldName, maxCount),
  uploadFields: (fields) => upload.fields(fields)
};
