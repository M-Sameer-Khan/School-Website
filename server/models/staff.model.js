module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define("staff", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING
    },
    profileImagePath: {
      type: DataTypes.STRING
    },
    education: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: "Array of education objects: [{ degree, institution, year }]"
    },
    achievements: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    socialMedia: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: "Object with social media links: { linkedin, twitter, etc. }"
    }
  }, {
    timestamps: true
  });

  return Staff;
};
