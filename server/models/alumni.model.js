module.exports = (sequelize, DataTypes) => {
  const Alumni = sequelize.define("alumni", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    graduationYear: {
      type: DataTypes.INTEGER,
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
    profession: {
      type: DataTypes.STRING
    },
    company: {
      type: DataTypes.STRING
    },
    profileImagePath: {
      type: DataTypes.STRING
    },
    achievements: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: "Array of achievement objects: [{ title, description, year }]"
    },
    education: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: "Array of education objects after school: [{ degree, institution, year }]"
    },
    testimonial: {
      type: DataTypes.TEXT,
      comment: "A testimonial about their experience at the school"
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    socialMedia: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: "Object with social media links: { linkedin, twitter, etc. }"
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamps: true
  });

  return Alumni;
};
