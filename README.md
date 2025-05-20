# School Website

A modern, responsive school website built with React, Node.js, Express, and PostgreSQL.

## Features

- **Responsive Design**: Built with Tailwind CSS for a beautiful experience on all devices
- **Dynamic Content Management**: Easily update content through the admin dashboard
- **Photo Gallery**: Showcase school events and activities with categorized galleries
- **Staff Directory**: Display faculty and staff with their details and achievements
- **Alumni Section**: Feature successful graduates with their testimonials
- **Authentication System**: Secure admin access for content management
- **Local Image Storage**: Optimized image uploads with automatic processing

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- React Query
- Formik & Yup for form handling

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Multer & Sharp for image handling

## Project Structure

```
school-website/
├── client/                  # React frontend
│   ├── public/              # Static assets
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route-specific components
│       ├── services/        # API service calls
│       └── contexts/        # React Context providers
├── server/                  # Node.js backend
│   ├── config/              # App configuration
│   ├── controllers/         # Request handlers
│   ├── models/              # Data models
│   ├── routes/              # API endpoints
│   ├── middleware/          # Custom middleware
│   └── uploads/             # Local image storage
└── .env                     # Environment variables (not committed)
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/school-website.git
   cd school-website
   ```

2. Install backend dependencies
   ```bash
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd client
   npm install
   cd ..
   ```

4. Create a PostgreSQL database
   ```sql
   CREATE DATABASE school_website;
   ```

5. Configure environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=school_website
   JWT_SECRET=your_secret_key
   PORT=5000
   NODE_ENV=development
   ```

### Running the Application

1. Start the development server (both frontend and backend)
   ```bash
   npm run dev
   ```

2. Access the application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## Deployment

The application can be deployed to any hosting service that supports Node.js applications. Popular options include:

- Heroku
- DigitalOcean
- AWS
- Vercel (for frontend) + Railway (for backend)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
