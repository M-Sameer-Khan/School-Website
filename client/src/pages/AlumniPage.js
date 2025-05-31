import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';

const AlumniPage = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeYear, setActiveYear] = useState('all');
  const [years, setYears] = useState([]);

  useEffect(() => {
    // This would typically fetch from your API
    // For now, let's use sample data
    setTimeout(() => {
      const alumniData = [
        {
          id: 1,
          name: 'Fatima Zaidi',
          graduationYear: 2020,
          profession: 'Medical Student',
          university: 'Aga Khan University',
          achievement: 'Secured scholarship for medical studies at one of Pakistan\'s premier medical institutions.',
          testimonial: 'THE YES SCHOOLING SYSTEM provided me with a strong foundation in sciences and instilled discipline that helps me in my medical studies.',
          image: 'https://source.unsplash.com/random/400x400/?graduate,woman'
        },
        {
          id: 2,
          name: 'Ahmed Hassan',
          graduationYear: 2019,
          profession: 'Software Engineer',
          university: 'FAST University',
          achievement: 'Working at a leading tech company developing innovative solutions.',
          testimonial: 'The technology programs and mathematics curriculum at THE YES SCHOOLING SYSTEM helped me develop analytical skills that are essential in my career.',
          image: 'https://source.unsplash.com/random/400x400/?graduate,man'
        },
        {
          id: 3,
          name: 'Sara Khan',
          graduationYear: 2018,
          profession: 'Chartered Accountant',
          university: 'Institute of Chartered Accountants of Pakistan',
          achievement: 'Passed CA exams with distinction and working at a Big Four accounting firm.',
          testimonial: 'The values of integrity and attention to detail that I learned at THE YES SCHOOLING SYSTEM guide me every day in my professional life.',
          image: 'https://source.unsplash.com/random/400x400/?graduate,woman,2'
        },
        {
          id: 4,
          name: 'Mohammad Ali',
          graduationYear: 2018,
          profession: 'Civil Engineer',
          university: 'NED University of Engineering & Technology',
          achievement: 'Part of the team designing sustainable infrastructure projects across Pakistan.',
          testimonial: 'My science teachers at THE YES SCHOOLING SYSTEM inspired my interest in engineering and helped me pursue my passion.',
          image: 'https://source.unsplash.com/random/400x400/?graduate,man,2'
        },
        {
          id: 5,
          name: 'Aisha Malik',
          graduationYear: 2017,
          profession: 'English Teacher',
          university: 'University of Karachi',
          achievement: 'Teaching English literature and language at a prestigious school.',
          testimonial: 'My love for literature was cultivated at THE YES SCHOOLING SYSTEM, and now I have the privilege of passing that passion to a new generation.',
          image: 'https://source.unsplash.com/random/400x400/?teacher,woman'
        },
        {
          id: 6,
          name: 'Hassan Raza',
          graduationYear: 2016,
          profession: 'Entrepreneur',
          university: 'Institute of Business Administration',
          achievement: 'Founded a startup focused on renewable energy solutions for residential areas.',
          testimonial: 'THE YES SCHOOLING SYSTEM taught me to think critically and seek solutions to problems, skills that are invaluable in my entrepreneurial journey.',
          image: 'https://source.unsplash.com/random/400x400/?entrepreneur,man'
        }
      ];

      // Extract unique years and add 'all' option
      const graduationYears = [
        { value: 'all', label: 'All Years' },
        ...Array.from(new Set(alumniData.map(alum => alum.graduationYear)))
          .map(year => ({ value: year.toString(), label: year.toString() }))
          .sort((a, b) => b.value - a.value) // Sort years in descending order
      ];

      setAlumni(alumniData);
      setYears(graduationYears);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredAlumni = activeYear === 'all'
    ? alumni
    : alumni.filter(alum => alum.graduationYear.toString() === activeYear);

  if (loading) return <Spinner />;

  if (error) return <div className="text-center text-red-600">Error loading alumni: {error}</div>;

  return (
    <div className="alumni-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-800 mb-2">Our Alumni</h1>
        <p className="text-gray-600">Meet our successful graduates and their achievements</p>
      </div>

      {/* Year Filter */}
      <div className="mb-8">
        <label className="mr-2 text-gray-700">Filter by Graduation Year:</label>
        <select 
          value={activeYear}
          onChange={(e) => setActiveYear(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {years.map(year => (
            <option key={year.value} value={year.value}>{year.label}</option>
          ))}
        </select>
      </div>

      {filteredAlumni.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No alumni found for the selected year.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlumni.map((alum) => (
            <Card key={alum.id}>
              <div className="p-4">
                <div className="flex flex-col items-center mb-4">
                  <img 
                    src={alum.image} 
                    alt={alum.name} 
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary-100"
                  />
                  <h3 className="text-xl font-semibold text-primary-700">{alum.name}</h3>
                  <p className="text-gray-600 font-medium">{alum.profession}</p>
                  <div className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm mt-2">
                    Class of {alum.graduationYear}
                  </div>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p className="text-sm"><strong>University:</strong> {alum.university}</p>
                  <p className="text-sm"><strong>Achievement:</strong> {alum.achievement}</p>
                  <blockquote className="italic text-sm border-l-4 border-primary-200 pl-4 mt-4">
                    "{alum.testimonial}"
                  </blockquote>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlumniPage;
