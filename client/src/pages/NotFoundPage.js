import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container mx-auto py-16">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-500">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-6">Page Not Found</h2>
        <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary-500 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-600 transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
      
      <div className="mt-12 max-w-lg mx-auto">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">You might be looking for:</h3>
        <ul className="space-y-3">
          <li>
            <Link to="/about" className="text-primary-600 hover:text-primary-700">
              → About Our School
            </Link>
          </li>
          <li>
            <Link to="/staff" className="text-primary-600 hover:text-primary-700">
              → Our Staff
            </Link>
          </li>
          <li>
            <Link to="/gallery" className="text-primary-600 hover:text-primary-700">
              → Photo Gallery
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-primary-600 hover:text-primary-700">
              → Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotFoundPage;
