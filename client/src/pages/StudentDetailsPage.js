import React from 'react';
import StudentFeeDetails from '../components/FeeManagement/StudentFeeDetails';

const StudentDetailsPage = () => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Student Fee Details</h1>
          <p className="text-xl max-w-3xl mx-auto">
            View and manage individual student fee payment history
          </p>
        </div>
      </section>

      {/* Student Details Component */}
      <StudentFeeDetails />
    </div>
  );
};

export default StudentDetailsPage;
