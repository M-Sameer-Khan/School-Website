const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// Create Sequelize instance
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.users = require("./user.model.js")(sequelize, Sequelize);
db.pages = require("./page.model.js")(sequelize, Sequelize);
db.staff = require("./staff.model.js")(sequelize, Sequelize);
db.departments = require("./department.model.js")(sequelize, Sequelize);
db.galleries = require("./gallery.model.js")(sequelize, Sequelize);
db.images = require("./image.model.js")(sequelize, Sequelize);
db.alumni = require("./alumni.model.js")(sequelize, Sequelize);

// Define relationships

// Department and Staff relationship (One-to-Many)
db.departments.hasMany(db.staff, { as: "staff" });
db.staff.belongsTo(db.departments, {
  foreignKey: "departmentId",
  as: "department"
});

// Gallery and Images relationship (One-to-Many)
db.galleries.hasMany(db.images, { as: "images" });
db.images.belongsTo(db.galleries, {
  foreignKey: "galleryId",
  as: "gallery"
});

// Image can be associated with Staff (profile picture)
db.staff.belongsTo(db.images, {
  foreignKey: "profileImageId",
  as: "profileImage",
  constraints: false
});

// Image can be associated with Alumni (profile picture)
db.alumni.belongsTo(db.images, {
  foreignKey: "profileImageId",
  as: "profileImage",
  constraints: false
});

module.exports = db;
