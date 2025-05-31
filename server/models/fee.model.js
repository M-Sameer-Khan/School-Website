module.exports = (sequelize, DataTypes) => {
  const FeeStructure = sequelize.define("fee_structure", {
    class_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    admission_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    monthly_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    annual_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    exam_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    lab_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00
    },
    transport_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00
    },
    academic_year: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "2025-2026"
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  return FeeStructure;
};
