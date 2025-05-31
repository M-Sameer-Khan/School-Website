const bcrypt = require('bcryptjs');
const db = require('./models');
const User = db.users;

// Admin user details
const adminUser = {
  username: 'admin',
  email: 'theyesschoolingsystem@gmail.com',
  password: 'SchoolAdmin2025!',
  role: 'admin'
};

// Connect to the database and create admin user
db.sequelize
  .sync()
  .then(async () => {
    console.log('Database connected successfully.');
    
    try {
      // Check if admin already exists
      const existingUser = await User.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            { username: adminUser.username },
            { email: adminUser.email }
          ]
        }
      });

      if (existingUser) {
        console.log('Admin user already exists!');
        console.log('Username:', adminUser.username);
        console.log('Password: [HIDDEN] (use the password you specified in the script)');
        process.exit();
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminUser.password, salt);

      // Create admin user
      const user = await User.create({
        username: adminUser.username,
        email: adminUser.email,
        password: hashedPassword,
        role: adminUser.role
      });

      console.log('Admin user created successfully!');
      console.log('----------------------------------');
      console.log('Username:', adminUser.username);
      console.log('Password:', adminUser.password);
      console.log('----------------------------------');
      console.log('Use these credentials to log in at the admin page.');
      
      process.exit();
    } catch (error) {
      console.error('Error creating admin user:', error);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  });
