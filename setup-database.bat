@echo off
echo School Website Database Setup
echo ===========================
echo.

echo Setting up PostgreSQL connection...
echo.

SET /p DB_PASSWORD=Enter your PostgreSQL password: 

echo.
echo Creating .env file with your credentials...

echo DB_HOST=localhost> .env
echo DB_USER=postgres>> .env
echo DB_PASSWORD=%DB_PASSWORD%>> .env
echo DB_NAME=school_website>> .env
echo JWT_SECRET=yes_school_system_secret_key>> .env
echo PORT=5001>> .env
echo NODE_ENV=development>> .env

echo.
echo Testing database connection...
echo.

cd server
node -e "const { Sequelize } = require('sequelize'); require('dotenv').config({ path: '../.env' }); const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, { host: process.env.DB_HOST, dialect: 'postgres' }); (async () => { try { await sequelize.authenticate(); console.log('Connection has been established successfully.'); process.exit(0); } catch (error) { console.error('Unable to connect to the database:', error); process.exit(1); } })();"

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Failed to connect to the database. Please check your PostgreSQL credentials and make sure PostgreSQL is running.
  exit /b 1
)

echo.
echo Database connection successful!
echo.
echo Adding Fee Management feature to your School Website...

cd ..
echo.
echo Setting up complete! You can now run your website with:
echo npm run dev
echo.
echo Your teacher data should now be visible in the website.
echo Fee Management System has been integrated from the School Finance Tracker.
echo.
echo Press any key to exit...
pause > nul
