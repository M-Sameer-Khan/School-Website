import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const FeesPage = () => {
  const [feeStructures, setFeeStructures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [academicYear, setAcademicYear] = useState('2025-2026');

  useEffect(() => {
    const fetchFeeStructures = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/fees?academic_year=${academicYear}`);
        setFeeStructures(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load fee structure information. Please try again later.');
        setLoading(false);
        console.error('Error fetching fee structures:', err);
      }
    };

    fetchFeeStructures();
  }, [academicYear]);

  return (
    <div className="fade-in">
      <Helmet>
        <title>Fee Structure | THE YES SCHOOLING SYSTEM</title>
        <meta name="description" content="View the fee structure for THE YES SCHOOLING SYSTEM for the current academic year." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Fee Structure</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Our transparent fee structure for the academic year {academicYear}
          </p>
        </div>
      </section>

      {/* Fee Structure Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700 mb-2">
              Select Academic Year:
            </label>
            <select
              id="academicYear"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="block w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="2025-2026">2025-2026</option>
              <option value="2024-2025">2024-2025</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <p>{error}</p>
            </div>
          ) : feeStructures.length === 0 ? (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
              <p>No fee structure information available for the selected academic year.</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Admission Fee
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monthly Fee
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Annual Fee
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exam Fee
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lab Fee
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transport Fee
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {feeStructures.map((fee) => (
                    <tr key={fee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {fee.class_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rs. {fee.admission_fee.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rs. {fee.monthly_fee.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rs. {fee.annual_fee.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rs. {fee.exam_fee.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rs. {fee.lab_fee ? fee.lab_fee.toLocaleString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rs. {fee.transport_fee ? fee.transport_fee.toLocaleString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Additional Information */}
          <div className="mt-12 bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Fee Payment Information</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>Payment Schedule:</strong> Monthly fees should be paid by the 10th of each month.
              </p>
              <p>
                <strong>Late Payment:</strong> A late fee of Rs. 200 will be charged after the due date.
              </p>
              <p>
                <strong>Payment Methods:</strong> Fees can be paid via bank transfer, online payment, or at the school's accounts office.
              </p>
              <p>
                <strong>Sibling Discount:</strong> A 10% discount on tuition fees is offered for the second child and 15% for the third child from the same family.
              </p>
              <p className="text-sm mt-6">
                <em>Note: This fee structure is subject to change. Parents will be notified of any changes in advance.</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Frequently Asked Questions About Fees
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Are there any additional fees not listed here?</h3>
              <p className="text-gray-600">
                The fee structure covers all mandatory fees. Additional costs may include uniforms, books, and extracurricular activities that are optional.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Is the admission fee refundable?</h3>
              <p className="text-gray-600">
                No, the admission fee is non-refundable and is charged only once at the time of admission.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Are there any scholarships available?</h3>
              <p className="text-gray-600">
                Yes, we offer merit-based scholarships to outstanding students. Please contact the school administration for more information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeesPage;
