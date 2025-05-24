import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="fade-in">
      {/* Hero Section with Gray Background */}
      <div className="relative mb-12" style={{
        backgroundColor: '#808080', /* Gray background */
        borderRadius: '0px',
        overflow: 'hidden',
        minHeight: '400px'
      }}>
        <div className="flex items-center justify-center h-full py-16">
          <div className="text-center p-6 max-w-lg">
            <h1 className="text-4xl font-bold mb-4 text-black">Welcome to THE YES SCHOOLING SYSTEM</h1>
            <p className="text-xl mb-8 text-black">Providing excellence in education since 2022</p>
            <div className="flex justify-center gap-4">
              <Link to="/about" className="px-6 py-3 bg-white text-black font-medium rounded hover:bg-gray-100 transition-colors">
                Learn More
              </Link>
              <Link to="/contact" className="px-6 py-3 border border-gray-500 text-white font-medium rounded hover:bg-white hover:text-black transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Our School?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Excellence in Education</h3>
              <p className="text-gray-600">
                Our curriculum is designed to challenge and inspire students to reach their full potential.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Dedicated Faculty</h3>
              <p className="text-gray-600">
                Our experienced teachers are committed to nurturing the academic and personal growth of each student.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Modern Facilities</h3>
              <p className="text-gray-600">
                Our campus features state-of-the-art facilities that enhance the learning experience for our students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="py-12 bg-gray-50 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Latest News & Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* News Item 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">May 15, 2025</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Annual Science Fair Winners</h3>
                <p className="text-gray-600 mb-4">
                  Congratulations to all participants and winners of our annual science fair. The creativity and innovation displayed were truly impressive.
                </p>
                <a href="#" className="text-primary-600 hover:text-primary-800 font-medium">Read More →</a>
              </div>
            </div>

            {/* News Item 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">May 10, 2025</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Sports Day Celebration</h3>
                <p className="text-gray-600 mb-4">
                  Our annual sports day was a huge success with enthusiastic participation from students across all grades.
                </p>
                <a href="#" className="text-primary-600 hover:text-primary-800 font-medium">Read More →</a>
              </div>
            </div>

            {/* News Item 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">May 5, 2025</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Cultural Festival Announcement</h3>
                <p className="text-gray-600 mb-4">
                  We are excited to announce our upcoming cultural festival celebrating the diversity and talents of our student body.
                </p>
                <a href="#" className="text-primary-600 hover:text-primary-800 font-medium">Read More →</a>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/news" className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-300">
              View All News & Events
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What Our Community Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Jane Doe</h4>
                  <p className="text-gray-500 text-sm">Parent</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The teachers at this school are exceptional. They truly care about each student's success and well-being. My child has flourished academically and socially since enrolling here."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">John Smith</h4>
                  <p className="text-gray-500 text-sm">Alumni</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The education I received here prepared me exceptionally well for college and beyond. The values instilled and the skills I learned continue to benefit me in my professional life."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-600 text-white py-16 rounded-lg mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Join Our School Community?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We invite you to explore what our school has to offer and discover the difference a quality education can make.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/admission" className="px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Admission Information
            </Link>
            <Link to="/contact" className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
