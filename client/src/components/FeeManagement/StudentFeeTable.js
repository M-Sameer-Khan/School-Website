import React, { useState, useEffect } from 'react';
import feeService from '../../services/feeService';

const StudentFeeTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await feeService.getStudents();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load students. Please try again.');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on search term
  const filteredStudents = students.filter(student => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roll_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row mb-4">
        <div className="col-md-6">
          <h2 className="mb-4">Student Fee Management</h2>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, roll number, or class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="alert alert-info">
          No students found matching your search criteria.
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Roll No.</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Monthly Fee</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.roll_number}</td>
                    <td>{student.name}</td>
                    <td>{student.class}</td>
                    <td>{student.section}</td>
                    <td>₹{student.monthly_fee}</td>
                    <td>
                      <span
                        className={`badge ${student.status === 'Active' ? 'bg-success' : 'bg-danger'}`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => window.location.href = `/student-details/${student.id}`}
                      >
                        View Details
                      </button>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => window.location.href = `/student-details/${student.id}?collect=true`}
                      >
                        Collect Fee
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav aria-label="Student pagination">
            <ul className="pagination justify-content-center">
              {Array.from({ length: Math.ceil(filteredStudents.length / studentsPerPage) }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default StudentFeeTable;
