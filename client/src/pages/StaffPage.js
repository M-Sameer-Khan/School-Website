import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDepartment, setActiveDepartment] = useState('all');

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get('/api/staff');
        setDepartments(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching staff:', err);
        setError('Failed to load staff information. Please try again later.');
        setLoading(false);
        
        // For demo purposes, set mock data if the API call fails
        setDepartments([
          {
            id: 1,
            name: 'Administration',
            staff: [
              {
                id: 1,
                name: 'Dr. Sarah Johnson',
                title: 'Principal',
                email: 'principal@example.school.com',
                phone: '(123) 456-7890',
                bio: 'Dr. Johnson has over 20 years of experience in education leadership and holds a Ph.D. in Educational Administration.',
                profileImage: {
                  url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
                }
              },
              {
                id: 2,
                name: 'Robert Williams',
                title: 'Vice Principal',
                email: 'vp@example.school.com',
                phone: '(123) 456-7891',
                bio: 'Mr. Williams oversees curriculum development and student activities. He has been with the school for 15 years.',
                profileImage: {
                  url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
                }
              }
            ]
          },
          {
            id: 2,
            name: 'Mathematics',
            staff: [
              {
                id: 3,
                name: 'Dr. Michael Chen',
                title: 'Head of Mathematics',
                email: 'math@example.school.com',
                phone: '(123) 456-7892',
                bio: 'Dr. Chen specializes in applied mathematics and has published several papers on innovative teaching methods.',
                profileImage: {
                  url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
                }
              },
              {
                id: 4,
                name: 'Emily Rodriguez',
                title: 'Mathematics Teacher',
                email: 'erodriguez@example.school.com',
                phone: '(123) 456-7893',
                bio: 'Ms. Rodriguez teaches Algebra and Calculus. She is known for making complex concepts accessible to all students.',
                profileImage: {
                  url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
                }
              }
            ]
          },
          {
            id: 3,
            name: 'Science',
            staff: [
              {
                id: 5,
                name: 'Dr. James Wilson',
                title: 'Head of Science',
                email: 'science@example.school.com',
                phone: '(123) 456-7894',
                bio: 'Dr. Wilson has a background in research physics and brings real-world applications into the classroom.',
                profileImage: {
                  url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
                }
              },
              {
                id: 6,
                name: 'Dr. Aisha Patel',
                title: 'Biology Teacher',
                email: 'biology@example.school.com',
                phone: '(123) 456-7895',
                bio: 'Dr. Patel has led several environmental research projects with students and organizes the annual science fair.',
                profileImage: {
                  url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
                }
              }
            ]
          }
        ]);
      }
    };

    fetchStaff();
  }, []);

  const filteredDepartments = activeDepartment === 'all' 
    ? departments 
    : departments.filter(dept => dept.id === parseInt(activeDepartment));

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading staff information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Staff</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Meet our dedicated team of educators and administrators who are committed to providing
          quality education and support to all students.
        </p>
      </div>

      {/* Department Filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setActiveDepartment('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeDepartment === 'all'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Departments
        </button>
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => setActiveDepartment(dept.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeDepartment === dept.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {dept.name}
          </button>
        ))}
      </div>

      {/* Staff Cards by Department */}
      {filteredDepartments.map((department) => (
        <div key={department.id} className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            {department.name} Department
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {department.staff.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-col h-full">
                  <div className="p-4 flex items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 mr-4 border-2 border-primary-100">
                      <img
                        src={member.profileImage?.url || 'https://via.placeholder.com/150'}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                      <p className="text-primary-600 font-medium">{member.title}</p>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>{member.email}</p>
                        <p>{member.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 flex-grow">
                    <p className="text-gray-700">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffPage;
