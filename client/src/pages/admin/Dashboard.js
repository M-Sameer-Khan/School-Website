import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens and backdrop for mobile */}
      <div 
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-20 transition-opacity lg:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-primary-800 text-white transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-primary-700">
          <div className="text-xl font-bold">Admin Dashboard</div>
          <button 
            className="p-1 rounded-md lg:hidden hover:bg-primary-700"
            onClick={() => setSidebarOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="px-3 py-4">
          <div className="space-y-1">
            <Link 
              to="/admin" 
              className="flex items-center px-4 py-2 text-white hover:bg-primary-700 rounded-md"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>

            <Link 
              to="/admin/pages" 
              className="flex items-center px-4 py-2 text-white hover:bg-primary-700 rounded-md"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Pages
            </Link>

            <Link 
              to="/admin/gallery" 
              className="flex items-center px-4 py-2 text-white hover:bg-primary-700 rounded-md"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Gallery
            </Link>

            <Link 
              to="/admin/staff" 
              className="flex items-center px-4 py-2 text-white hover:bg-primary-700 rounded-md"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Staff
            </Link>

            <Link 
              to="/admin/alumni" 
              className="flex items-center px-4 py-2 text-white hover:bg-primary-700 rounded-md"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Alumni
            </Link>
          </div>

          <div className="pt-8">
            <button 
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-white hover:bg-primary-700 rounded-md"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                className="px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center">
                <span className="text-gray-800 text-sm font-medium">
                  Logged in as: <span className="text-primary-600">{currentUser?.email || 'Admin'}</span>
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/pages/*" element={<PageManager />} />
            <Route path="/gallery/*" element={<GalleryManager />} />
            <Route path="/staff/*" element={<StaffManager />} />
            <Route path="/alumni/*" element={<AlumniManager />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Placeholder components for each section
const DashboardHome = () => (
  <div>
    <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <DashboardCard title="Pages" count="5" icon="document" color="blue" />
      <DashboardCard title="Gallery Albums" count="4" icon="photo" color="green" />
      <DashboardCard title="Staff Members" count="8" icon="users" color="yellow" />
      <DashboardCard title="Alumni" count="6" icon="academic-cap" color="purple" />
    </div>
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        <ActivityItem 
          action="Created new gallery" 
          item="Annual Day 2025" 
          time="2 hours ago" 
          icon="photo"
        />
        <ActivityItem 
          action="Updated staff member" 
          item="Mr. Khalid Ahmed" 
          time="Yesterday" 
          icon="user"
        />
        <ActivityItem 
          action="Added new page" 
          item="Admission Process" 
          time="3 days ago" 
          icon="document"
        />
      </div>
    </div>
  </div>
);

const PageManager = () => (
  <div>
    <h1 className="text-2xl font-semibold mb-6">Manage Pages</h1>
    <p className="text-gray-600">This section will allow you to create and edit website pages.</p>
  </div>
);

const GalleryManager = () => (
  <div>
    <h1 className="text-2xl font-semibold mb-6">Manage Gallery</h1>
    <p className="text-gray-600">This section will allow you to create photo albums and upload images.</p>
  </div>
);

const StaffManager = () => (
  <div>
    <h1 className="text-2xl font-semibold mb-6">Manage Staff</h1>
    <p className="text-gray-600">This section will allow you to add and edit staff profiles.</p>
  </div>
);

const AlumniManager = () => (
  <div>
    <h1 className="text-2xl font-semibold mb-6">Manage Alumni</h1>
    <p className="text-gray-600">This section will allow you to add and edit alumni profiles.</p>
  </div>
);

// Helper Components
const DashboardCard = ({ title, count, icon, color }) => {
  const getIconClass = (iconName) => {
    switch (iconName) {
      case 'document':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'photo':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'users':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'academic-cap':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getColorClass = (colorName) => {
    switch (colorName) {
      case 'blue': return 'bg-blue-100 text-blue-800';
      case 'green': return 'bg-green-100 text-green-800';
      case 'yellow': return 'bg-yellow-100 text-yellow-800';
      case 'purple': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${getColorClass(color)} mr-4`}>
          {getIconClass(icon)}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-3xl font-bold text-gray-700">{count}</p>
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ action, item, time, icon }) => {
  const getIconClass = (iconName) => {
    switch (iconName) {
      case 'document':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'photo':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'user':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="flex items-center py-2">
      <div className="bg-gray-100 rounded-full p-2 mr-4 text-gray-600">
        {getIconClass(icon)}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{action}</p>
        <p className="text-sm text-gray-600">{item}</p>
      </div>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  );
};

export default Dashboard;
