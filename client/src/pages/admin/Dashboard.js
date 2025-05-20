import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

// Context

// Context
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // For demo purposes, we'll just render a simple dashboard
  return (
    <div className="admin-dashboard">
      <div className="bg-primary-700 text-white p-4 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-primary-700 px-4 py-2 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <nav className="bg-white shadow rounded-lg p-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/admin"
                    className={`block px-4 py-2 rounded ${
                      activeTab === 'dashboard'
                        ? 'bg-primary-100 text-primary-700'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/pages"
                    className={`block px-4 py-2 rounded ${
                      activeTab === 'pages'
                        ? 'bg-primary-100 text-primary-700'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('pages')}
                  >
                    Pages
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/staff"
                    className={`block px-4 py-2 rounded ${
                      activeTab === 'staff'
                        ? 'bg-primary-100 text-primary-700'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('staff')}
                  >
                    Staff
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/gallery"
                    className={`block px-4 py-2 rounded ${
                      activeTab === 'gallery'
                        ? 'bg-primary-100 text-primary-700'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('gallery')}
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/alumni"
                    className={`block px-4 py-2 rounded ${
                      activeTab === 'alumni'
                        ? 'bg-primary-100 text-primary-700'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('alumni')}
                  >
                    Alumni
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Welcome to the Admin Dashboard</h2>
                      <p className="mb-4">
                        Use the sidebar to navigate to different sections of the admin panel.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-primary-50 p-4 rounded-lg border border-primary-200">
                          <h3 className="font-semibold text-primary-700">Pages</h3>
                          <p className="text-2xl font-bold">5</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <h3 className="font-semibold text-green-700">Staff Members</h3>
                          <p className="text-2xl font-bold">12</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h3 className="font-semibold text-blue-700">Gallery Items</h3>
                          <p className="text-2xl font-bold">8</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <h3 className="font-semibold text-purple-700">Alumni</h3>
                          <p className="text-2xl font-bold">24</p>
                        </div>
                      </div>
                    </div>
                  }
                />
                <Route path="/pages/*" element={<div className="p-4 bg-white rounded-md shadow-sm"><h2 className="text-xl font-semibold">Page Management</h2><p className="mt-2 text-gray-600">Here you can manage website pages.</p></div>} />
                <Route path="/staff/*" element={<div className="p-4 bg-white rounded-md shadow-sm"><h2 className="text-xl font-semibold">Staff Management</h2><p className="mt-2 text-gray-600">Here you can manage staff members.</p></div>} />
                <Route path="/gallery/*" element={<div className="p-4 bg-white rounded-md shadow-sm"><h2 className="text-xl font-semibold">Gallery Management</h2><p className="mt-2 text-gray-600">Here you can manage photo galleries.</p></div>} />
                <Route path="/alumni/*" element={<div className="p-4 bg-white rounded-md shadow-sm"><h2 className="text-xl font-semibold">Alumni Management</h2><p className="mt-2 text-gray-600">Here you can manage alumni records.</p></div>} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
