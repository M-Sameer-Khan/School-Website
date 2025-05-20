module.exports = (sequelize, DataTypes) => {
  const Gallery = sequelize.define("gallery", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z0-9-]+$/i // Only allow alphanumeric characters and hyphens
      }
    },
    coverImagePath: {
      type: DataTypes.STRING,
      comment: "Path to the cover image for this gallery"
    },
    eventDate: {
      type: DataTypes.DATE,
      comment: "Date when the event or photos were taken"
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    year: {
      type: DataTypes.INTEGER,
      comment: "School year or calendar year for easier filtering"
    }
  }, {
    timestamps: true,
    hooks: {
      beforeCreate: (gallery) => {
        if (gallery.isPublished && !gallery.publishedAt) {
          gallery.publishedAt = new Date();
        }
        
        // Extract year from eventDate if provided, or use current year
        if (gallery.eventDate && !gallery.year) {
          gallery.year = new Date(gallery.eventDate).getFullYear();
        } else if (!gallery.year) {
          gallery.year = new Date().getFullYear();
        }
      },
      beforeUpdate: (gallery) => {
        if (gallery.isPublished && !gallery.publishedAt) {
          gallery.publishedAt = new Date();
        }
        
        // Update year if eventDate changes
        if (gallery.eventDate && gallery.changed('eventDate')) {
          gallery.year = new Date(gallery.eventDate).getFullYear();
        }
      }
    }
  });

  return Gallery;
};
