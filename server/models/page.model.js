module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define("page", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z0-9-]+$/i // Only allow alphanumeric characters and hyphens
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    metaTitle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    metaDescription: {
      type: DataTypes.STRING,
      allowNull: true
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
    pageType: {
      type: DataTypes.ENUM('home', 'about', 'contact', 'gallery', 'staff', 'alumni', 'custom'),
      defaultValue: 'custom'
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'pages',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    hooks: {
      beforeCreate: (page) => {
        if (page.isPublished && !page.publishedAt) {
          page.publishedAt = new Date();
        }
      },
      beforeUpdate: (page) => {
        if (page.isPublished && !page.publishedAt) {
          page.publishedAt = new Date();
        }
      }
    }
  });

  return Page;
};
