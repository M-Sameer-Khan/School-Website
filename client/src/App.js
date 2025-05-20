import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import GalleryDetailPage from './pages/GalleryDetailPage';
import StaffPage from './pages/StaffPage';
import AlumniPage from './pages/AlumniPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin components
import AdminDashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/Login';
import PrivateRoute from './components/common/PrivateRoute';

// Context
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <div className="page-container bg-gray-50">
        <Header />
        <main className="page-content container mx-auto px-4 py-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/gallery/:slug" element={<GalleryDetailPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/alumni" element={<AlumniPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/*" 
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
