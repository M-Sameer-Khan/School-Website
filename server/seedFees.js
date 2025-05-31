const db = require("./models");
const FeeStructure = db.feeStructures;

// Sample fee data for various classes
const feeData = [
  {
    class_name: "Play Group",
    admission_fee: 5000,
    monthly_fee: 2500,
    annual_fee: 5000,
    exam_fee: 1000,
    lab_fee: 0,
    transport_fee: 2000,
    academic_year: "2025-2026",
    notes: "Books and uniform costs are separate"
  },
  {
    class_name: "Kindergarten",
    admission_fee: 6000,
    monthly_fee: 3000,
    annual_fee: 6000,
    exam_fee: 1200,
    lab_fee: 0,
    transport_fee: 2000,
    academic_year: "2025-2026",
    notes: "Books and uniform costs are separate"
  },
  {
    class_name: "Class 1",
    admission_fee: 8000,
    monthly_fee: 3500,
    annual_fee: 7000,
    exam_fee: 1500,
    lab_fee: 0,
    transport_fee: 2000,
    academic_year: "2025-2026",
    notes: "Books and uniform costs are separate"
  },
  {
    class_name: "Class 2",
    admission_fee: 8000,
    monthly_fee: 3700,
    annual_fee: 7000,
    exam_fee: 1500,
    lab_fee: 0,
    transport_fee: 2000,
    academic_year: "2025-2026",
    notes: "Books and uniform costs are separate"
  },
  {
    class_name: "Class 3",
    admission_fee: 8000,
    monthly_fee: 3900,
    annual_fee: 7000,
    exam_fee: 1500,
    lab_fee: 0,
    transport_fee: 2000,
    academic_year: "2025-2026",
    notes: "Books and uniform costs are separate"
  },
  {
    class_name: "Class 4",
    admission_fee: 10000,
    monthly_fee: 4100,
    annual_fee: 8000,
    exam_fee: 1800,
    lab_fee: 1000,
    transport_fee: 2000,
    academic_year: "2025-2026",
    notes: "Books and uniform costs are separate"
  },
  {
    class_name: "Class 5",
    admission_fee: 10000,
    monthly_fee: 4300,
    annual_fee: 8000,
    exam_fee: 1800,
    lab_fee: 1000,
    transport_fee: 2000,
    academic_year: "2025-2026",
    notes: "Books and uniform costs are separate"
  },
  {
    class_name: "Class 6",
    admission_fee: 12000,
    monthly_fee: 4500,
    annual_fee: 9000,
    exam_fee: 2000,
    lab_fee: 1500,
    transport_fee: 2000,
    academic_year: "2025-2026",
    notes: "Books and uniform costs are separate"
  },
  {
    class_name: "Class 7",
    admission_fee: 12000,
    monthly_fee: 4700,
    annual_fee: 9000,
    exam_fee: 2000,
    lab_fee: 1500,
    transport_fee: 2000,
    academic_year: "2025-2026",
    notes: "Books and uniform costs are separate"
  },
  {
    class_name: "Class 8",
    admission_fee: 15000,
    monthly_fee: 4900,
    annual_fee: 10000,
    exam_fee: 2500,
    lab_fee: 2000,
    transport_fee: 2000,
    academic_year: "2025-2026",
    notes: "Books and uniform costs are separate"
  },
  {
    class_name: "Class 9",
    admission_fee: 15000,
    monthly_fee: 5200,
    annual_fee: 10000,
    exam_fee: 3000,
    lab_fee: 2500,
    transport_fee: 2000,
    academic_year: "2025-2026",
    notes: "Books and uniform costs are separate"
  },
  {
    class_name: "Class 10",
    admission_fee: 15000,
    monthly_fee: 5500,
    annual_fee: 10000,
    exam_fee: 3000,
    lab_fee: 2500,
    transport_fee: 2000,
    academic_year: "2025-2026",
    notes: "Books and uniform costs are separate"
  },
  // Add some data for previous academic year
  {
    class_name: "Play Group",
    admission_fee: 4500,
    monthly_fee: 2300,
    annual_fee: 4500,
    exam_fee: 900,
    lab_fee: 0,
    transport_fee: 1800,
    academic_year: "2024-2025",
    notes: "Books and uniform costs are separate"
  },
  {
    class_name: "Kindergarten",
    admission_fee: 5500,
    monthly_fee: 2800,
    annual_fee: 5500,
    exam_fee: 1100,
    lab_fee: 0,
    transport_fee: 1800,
    academic_year: "2024-2025",
    notes: "Books and uniform costs are separate"
  }
];

// Connect to the database and seed the data
db.sequelize
  .sync()
  .then(() => {
    console.log('Database connected successfully.');
    
    // Insert fee data
    FeeStructure.bulkCreate(feeData)
      .then(() => {
        console.log('Fee data added successfully.');
        process.exit();
      })
      .catch((error) => {
        console.error('Error adding fee data:', error);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  });
