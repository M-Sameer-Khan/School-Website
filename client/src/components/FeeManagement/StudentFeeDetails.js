import React, { useState, useEffect } from 'react';
import feeService from '../../services/feeService';

const StudentFeeDetails = () => {
  // Instead of using useParams hook directly, get studentId from the URL manually
  const studentId = window.location.pathname.split('/').pop();
  
  // Instead of useNavigate, use window.location for navigation
  const navigateBack = () => {
    window.location.href = '/fee-management';
  };
  
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        setLoading(true);
        const data = await feeService.getStudentById(studentId);
        setStudent(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student details:', err);
        setError('Failed to load student details. Please try again.');
        setLoading(false);
      }
    };

    if (studentId) {
      fetchStudentDetails();
    }
  }, [studentId]);
  
  // Function to handle fee payment
  const handleFeePayment = async (month) => {
    try {
      if (!student) return;
      
      // Simulate fee payment (in a real app, this would call an API)
      alert(`Fee payment for ${month} has been recorded for ${student.name}`);
      
      // Refresh student data
      window.location.reload();
    } catch (err) {
      console.error('Error processing payment:', err);
      setError('Failed to process payment. Please try again.');
    }
  };
  
  // Get payment status for a specific month
  const getPaymentStatus = (month) => {
    if (!student || !student.payments) return 'Unknown';
    
    const payment = student.payments.find(p => 
      p.month === months.indexOf(month) + 1 && p.year === year
    );
    
    return payment ? payment.payment_status : 'Unpaid';
  };
  
  // Get payment amount for a specific month
  const getPaymentAmount = (month) => {
    if (!student || !student.payments) return 0;
    
    const payment = student.payments.find(p => 
      p.month === months.indexOf(month) + 1 && p.year === year
    );
    
    return payment ? payment.amount : 0;
  };
  
  // Get payment date for a specific month
  const getPaymentDate = (month) => {
    if (!student || !student.payments) return 'N/A';
    
    const payment = student.payments.find(p => 
      p.month === months.indexOf(month) + 1 && p.year === year
    );
    
    return payment && payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : 'N/A';
  };
  
  // Calculate status badge color
  const getStatusBadgeColor = (status) => {
    switch(status) {
      case 'Paid':
        return 'success';
      case 'Partially Paid':
        return 'warning';
      case 'Unpaid':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container my-4">
      <button 
        className="btn btn-outline-primary mb-3"
        onClick={navigateBack}
      >
        &laquo; Back to Students
      </button>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : student ? (
        <>
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Student Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Roll Number:</strong> {student.roll_number}</p>
                  <p><strong>Name:</strong> {student.name}</p>
                  <p><strong>Father's Name:</strong> {student.father_name}</p>
                  <p><strong>Class:</strong> {student.class}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Admission Date:</strong> {student.admission_date || 'N/A'}</p>
                  <p><strong>Phone:</strong> {student.phone || 'N/A'}</p>
                  <p><strong>Monthly Fee:</strong> ₹{student.monthly_fee}</p>
                  <p><strong>Status:</strong> 
                    <span className={`badge ${student.status === 'Active' ? 'bg-success' : 'bg-danger'} ms-2`}>
                      {student.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Fee Payment History</h3>
            <div className="mb-3">
              <select 
                className="form-select" 
                value={year} 
                onChange={(e) => setYear(parseInt(e.target.value))}
              >
                {[2023, 2024, 2025, 2026].map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Month</th>
                  <th>Status</th>
                  <th>Amount Paid</th>
                  <th>Payment Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {months.map(month => (
                  <tr key={month}>
                    <td>{month}</td>
                    <td>
                      <span className={`badge bg-${getStatusBadgeColor(getPaymentStatus(month))}`}>
                        {getPaymentStatus(month)}
                      </span>
                    </td>
                    <td>₹{getPaymentAmount(month)}</td>
                    <td>{getPaymentDate(month)}</td>
                    <td>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handleFeePayment(month)}
                        disabled={getPaymentStatus(month) === 'Paid'}
                      >
                        {getPaymentStatus(month) === 'Paid' ? 'Paid' : 'Collect Fee'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="alert alert-warning" role="alert">
          Student not found
        </div>
      )}
    </div>
  );
};

export default StudentFeeDetails;
