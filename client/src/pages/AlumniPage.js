import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlumniPage = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await axios.get('/api/alumni');
        setAlumni(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching alumni:', err);
        setError('Failed to load alumni information. Please try again later.');
        setLoading(false);
        
        // For demo purposes, set mock data if the API call fails
        setAlumni([
          {
            id: 1,
            name: 'Jennifer Clark',
            graduationYear: 2018,
            college: 'Harvard University',
            career: 'Medical Researcher',
            achievements: 'Published research on infectious diseases. Recipient of the Young Scientist Award 2023.',
            quote: 'The strong foundation I received at this school prepared me for the challenges of medical research.',
            profileImage: {
              url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
            }
          },
          {
            id: 2,
            name: 'Marcus Thompson',
            graduationYear: 2017,
            college: 'MIT',
            career: 'Software Engineer',
            achievements: 'Created a startup focused on educational technology. Developed apps that are used by over 1 million students worldwide.',
            quote: 'My interest in computer science was sparked in the coding club. I\'m grateful for the mentors who encouraged me to pursue this path.',
            profileImage: {
              url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
            }
          },
          {
            id: 3,
            name: 'Sophia Martinez',
            graduationYear: 2016,
            college: 'Stanford University',
            career: 'Environmental Scientist',
            achievements: 'Leading conservation projects in South America. Featured in National Geographic for work on sustainable agriculture.',
            quote: 'The science projects and field trips we did inspired my passion for environmental conservation.',
            profileImage: {
              url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
            }
          },
          {
            id: 4,
            name: 'David Kim',
            graduationYear: 2015,
            college: 'Juilliard School',
            career: 'Concert Pianist',
            achievements: 'Performed at Carnegie Hall. Released two classical music albums. Winner of the International Piano Competition 2022.',
            quote: 'The music program at school gave me the confidence to pursue my dream of becoming a professional musician.',
            profileImage: {
              url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
            }
          },
          {
            id: 5,
            name: 'Olivia Washington',
            graduationYear: 2019,
            college: 'Columbia University',
            career: 'Journalist',
            achievements: 'Pulitzer Prize nominee for investigative reporting. Published articles in major international newspapers.',
            quote: 'My English teacher\'s emphasis on critical thinking and clear writing has been invaluable in my journalism career.',
            profileImage: {
              url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
            }
          },
          {
            id: 6,
            name: 'James Wilson',
            graduationYear: 2020,
            college: 'Yale University',
            career: 'Law Student',
            achievements: 'Editor of Law Review. Internship at the Supreme Court. Community service award for pro bono legal aid.',
            quote: 'The debate team at school taught me how to construct and present arguments, which has been essential for my legal studies.',
            profileImage: {
              url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
            }
          }
        ]);
      }
    };

    fetchAlumni();
  }, []);

  const getYearOptions = () => {
    const years = alumni.map(alum => alum.graduationYear);
    return [...new Set(years)].sort((a, b) => b - a); // Unique years in descending order
  };

  const filteredAlumni = activeFilter === 'all' 
    ? alumni 
    : alumni.filter(alum => alum.graduationYear === parseInt(activeFilter));

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading alumni information...</p>
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
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Distinguished Alumni</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We take pride in the accomplishments of our former students who have gone on to make significant 
          contributions in various fields. Their success stories inspire our current students to dream big.
        </p>
      </div>

      {/* Year Filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === 'all'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Classes
        </button>
        {getYearOptions().map((year) => (
          <button
            key={year}
            onClick={() => setActiveFilter(year)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === year
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Class of {year}
          </button>
        ))}
      </div>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAlumni.map((alum) => (
          <div key={alum.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 mr-4 border-2 border-primary-100">
                  <img
                    src={alum.profileImage?.url || 'https://via.placeholder.com/150'}
                    alt={alum.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{alum.name}</h3>
                  <p className="text-primary-600 font-medium">Class of {alum.graduationYear}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-700"><span className="font-medium">College:</span> {alum.college}</p>
                <p className="text-gray-700"><span className="font-medium">Career:</span> {alum.career}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Achievements</h4>
                <p className="text-gray-700">{alum.achievements}</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-600 italic">"{alum.quote}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Alumni Network</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Are you a former student? We'd love to hear about your journey and achievements since graduation.
          Join our alumni network to stay connected with the school and fellow graduates.
        </p>
        <button className="bg-primary-500 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-600 transition-colors">
          Register as Alumni
        </button>
      </div>
    </div>
  );
};

export default AlumniPage;
