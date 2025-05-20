module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("image", {
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
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filepath: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Path to the image file relative to the uploads directory"
    },
    originalFilename: {
      type: DataTypes.STRING,
      comment: "Original filename before processing"
    },
    mimetype: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.INTEGER,
      comment: "File size in bytes"
    },
    width: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.INTEGER
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    alt: {
      type: DataTypes.STRING,
      comment: "Alternative text for accessibility"
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    metadata: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: "Additional metadata like camera info, location, etc."
    }
  }, {
    timestamps: true
  });

  return Image;
};
