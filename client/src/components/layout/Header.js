import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    // Redirect to home page if on admin page
    if (location.pathname.startsWith('/admin')) {
      window.location.href = '/';
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-primary-700">School Name</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/about" label="About" />
            <NavLink to="/gallery" label="Gallery" />
            <NavLink to="/staff" label="Staff" />
            <NavLink to="/alumni" label="Alumni" />
            <NavLink to="/contact" label="Contact" />
            
            {/* Login/Admin Button */}
            {currentUser ? (
              <div className="relative group">
                <button className="px-4 py-2 text-primary-600 hover:text-primary-800 font-medium">
                  Dashboard
                </button>
                <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <Link 
                    to="/admin" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Admin Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/admin/login" 
                className="px-4 py-2 border border-primary-500 text-primary-700 rounded-md hover:bg-primary-50 transition-colors duration-300"
              >
                Admin Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col space-y-2">
              <MobileNavLink to="/" label="Home" />
              <MobileNavLink to="/about" label="About" />
              <MobileNavLink to="/gallery" label="Gallery" />
              <MobileNavLink to="/staff" label="Staff" />
              <MobileNavLink to="/alumni" label="Alumni" />
              <MobileNavLink to="/contact" label="Contact" />
              
              {/* Login/Admin Button */}
              {currentUser ? (
                <>
                  <MobileNavLink to="/admin" label="Admin Dashboard" />
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <MobileNavLink to="/admin/login" label="Admin Login" />
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

// Desktop Navigation Link
const NavLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
                  (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link
      to={to}
      className={`px-3 py-2 text-sm font-medium ${isActive 
        ? 'text-primary-700 border-b-2 border-primary-500' 
        : 'text-gray-700 hover:text-primary-600 hover:border-b-2 hover:border-primary-300'}`}
    >
      {label}
    </Link>
  );
};

// Mobile Navigation Link
const MobileNavLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
                  (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link
      to={to}
      className={`px-4 py-2 text-sm font-medium ${isActive 
        ? 'bg-primary-50 text-primary-700' 
        : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'}`}
    >
      {label}
    </Link>
  );
};

export default Header;
