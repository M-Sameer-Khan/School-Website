import React from 'react';
import StudentFeeTable from '../components/FeeManagement/StudentFeeTable';

const FeeManagementPage = () => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Student Fee Management</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Manage and track student fee payments for the YES Schooling System
          </p>
        </div>
      </section>

      {/* Fee Management Component */}
      <StudentFeeTable />
    </div>
  );
};

export default FeeManagementPage;
