import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';

const StaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This would typically fetch from your API
    // For now, let's use sample data
    setTimeout(() => {
      const departmentData = [
        { id: 'all', name: 'All Staff' },
        { id: 'administration', name: 'Administration' },
        { id: 'teaching', name: 'Teaching Staff' },
        { id: 'support', name: 'Support Staff' }
      ];

      const staffData = [
        {
          id: 1,
          name: 'Mr. Khalid Ahmed',
          position: 'Principal',
          department: 'administration',
          bio: 'Mr. Khalid has over 20 years of experience in education leadership and holds a Masters degree in Education.',
          education: 'M.Ed., University of Karachi',
          email: 'principal@theyesschoolingsystem.edu',
          phone: '0314-2315538',
          image: 'https://source.unsplash.com/random/400x400/?principal,man'
        },
        {
          id: 2,
          name: 'Mrs. Aisha Khan',
          position: 'Vice Principal',
          department: 'administration',
          bio: 'Mrs. Aisha oversees academic programs and student development with 15 years of teaching experience.',
          education: 'M.Sc. Mathematics, Punjab University',
          email: 'viceprincipal@theyesschoolingsystem.edu',
          phone: '0311-8410539',
          image: 'https://source.unsplash.com/random/400x400/?teacher,woman'
        },
        {
          id: 3,
          name: 'Mr. Imran Malik',
          position: 'Mathematics Teacher',
          department: 'teaching',
          bio: 'Mr. Imran specializes in making complex mathematical concepts accessible to all students.',
          education: 'B.Sc. Mathematics, University of Sindh',
          email: 'math@theyesschoolingsystem.edu',
          phone: '0314-XXXXXXX',
          image: 'https://source.unsplash.com/random/400x400/?math,teacher,man'
        },
        {
          id: 4,
          name: 'Ms. Fatima Hassan',
          position: 'Science Teacher',
          department: 'teaching',
          bio: 'Ms. Fatima brings science to life through practical experiments and real-world applications.',
          education: 'M.Sc. Physics, University of Karachi',
          email: 'science@theyesschoolingsystem.edu',
          phone: '0311-XXXXXXX',
          image: 'https://source.unsplash.com/random/400x400/?science,teacher,woman'
        },
        {
          id: 5,
          name: 'Mr. Ali Raza',
          position: 'English Teacher',
          department: 'teaching',
          bio: 'Mr. Ali encourages students to develop their language skills through creative writing and reading.',
          education: 'M.A. English Literature, Karachi University',
          email: 'english@theyesschoolingsystem.edu',
          phone: '0314-XXXXXXX',
          image: 'https://source.unsplash.com/random/400x400/?english,teacher,man'
        },
        {
          id: 6,
          name: 'Mrs. Saima Jabbar',
          position: 'Urdu Teacher',
          department: 'teaching',
          bio: 'Mrs. Saima is dedicated to preserving and promoting Urdu language and literature among students.',
          education: 'M.A. Urdu, University of Punjab',
          email: 'urdu@theyesschoolingsystem.edu',
          phone: '0311-XXXXXXX',
          image: 'https://source.unsplash.com/random/400x400/?teacher,woman,2'
        },
        {
          id: 7,
          name: 'Mr. Ahmed Khan',
          position: 'IT Administrator',
          department: 'support',
          bio: 'Mr. Ahmed manages all IT systems and introduces students to the latest technologies.',
          education: 'B.Sc. Computer Science, FAST University',
          email: 'it@theyesschoolingsystem.edu',
          phone: '0314-XXXXXXX',
          image: 'https://source.unsplash.com/random/400x400/?it,admin,man'
        },
        {
          id: 8,
          name: 'Ms. Nadia Sheikh',
          position: 'Librarian',
          department: 'support',
          bio: 'Ms. Nadia cultivates a love of reading among students and helps them discover new worlds through books.',
          education: 'B.L.I.S., University of Karachi',
          email: 'library@theyesschoolingsystem.edu',
          phone: '0311-XXXXXXX',
          image: 'https://source.unsplash.com/random/400x400/?librarian,woman'
        }
      ];

      setDepartments(departmentData);
      setStaff(staffData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredStaff = activeTab === 'all' 
    ? staff 
    : staff.filter(member => member.department === activeTab);

  if (loading) return <Spinner />;

  if (error) return <div className="text-center text-red-600">Error loading staff: {error}</div>;

  return (
    <div className="staff-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-800 mb-2">Our Staff</h1>
        <p className="text-gray-600">Meet the dedicated professionals at THE YES SCHOOLING SYSTEM</p>
      </div>

      {/* Department Tabs */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex flex-wrap -mb-px">
          {departments.map(dept => (
            <button
              key={dept.id}
              className={`inline-block py-4 px-6 text-sm font-medium ${activeTab === dept.id
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-primary-600 hover:border-b-2 hover:border-primary-300'
              }`}
              onClick={() => setActiveTab(dept.id)}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </div>

      {filteredStaff.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No staff members in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStaff.map((member) => (
            <Card key={member.id}>
              <div className="p-4">
                <div className="flex flex-col items-center mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary-100"
                  />
                  <h3 className="text-xl font-semibold text-primary-700">{member.name}</h3>
                  <p className="text-gray-600 font-medium">{member.position}</p>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p className="text-sm">{member.bio}</p>
                  <p className="text-sm"><strong>Education:</strong> {member.education}</p>
                  <p className="text-sm"><strong>Email:</strong> {member.email}</p>
                  <p className="text-sm"><strong>Phone:</strong> {member.phone}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffPage;
