import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="fade-in">
      {/* Page Header */}
      <section className="bg-primary-700 text-white py-12 px-4 rounded-lg mb-12">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">About Our School</h1>
          <p className="text-xl">Learn about our history, mission, and values.</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                Our mission is to provide a nurturing and dynamic learning environment where students develop the knowledge, skills, and character necessary to achieve academic excellence, personal growth, and success in a global society.
              </p>
              <p className="text-gray-600">
                We strive to inspire a lifelong passion for learning, foster critical thinking, and empower our students to become responsible, ethical, and compassionate global citizens who make positive contributions to their communities and the world.
              </p>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Vision</h2>
              <p className="text-gray-600 mb-4">
                Our vision is to be recognized as a leading educational institution that cultivates innovative thinkers, effective communicators, and ethical leaders prepared to thrive in an ever-changing global landscape.
              </p>
              <p className="text-gray-600">
                We envision a school community that celebrates diversity, promotes excellence, and provides a balanced education that addresses the intellectual, social, emotional, and physical needs of each student.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="bg-gray-50 py-16 rounded-lg mb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Our History</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-0 md:left-1/2 h-full w-1 bg-primary-500 transform md:translateX(-0.5px)"></div>
              
              {/* Timeline Items */}
              <div className="relative z-10">
                {/* Year 1 */}
                <div className="mb-12 relative">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8 md:text-right order-1 md:order-1">
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2 text-primary-700">[FOUNDING YEAR]</h3>
                        <p className="text-gray-600">
                          Our school was founded with a vision to provide quality education that balances academic excellence with character development.
                        </p>
                      </div>
                    </div>
                    <div className="mx-auto md:mx-0 h-8 w-8 rounded-full bg-primary-500 border-4 border-white flex items-center justify-center shadow-md order-0 md:order-2 my-4 md:my-0"></div>
                    <div className="md:w-1/2 md:pl-8 order-2 md:order-3"></div>
                  </div>
                </div>

                {/* Year 2 */}
                <div className="mb-12 relative">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8 order-1 md:order-0"></div>
                    <div className="mx-auto md:mx-0 h-8 w-8 rounded-full bg-primary-500 border-4 border-white flex items-center justify-center shadow-md order-0 md:order-1 my-4 md:my-0"></div>
                    <div className="md:w-1/2 md:pl-8 md:text-left order-2 md:order-2">
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2 text-primary-700">[MILESTONE YEAR]</h3>
                        <p className="text-gray-600">
                          The school expanded its facilities and introduced innovative teaching methodologies, setting new standards for educational excellence in the region.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Year 3 */}
                <div className="mb-12 relative">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8 md:text-right order-1 md:order-1">
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2 text-primary-700">[MILESTONE YEAR]</h3>
                        <p className="text-gray-600">
                          Our school achieved national recognition for academic excellence and was awarded for its outstanding contributions to education.
                        </p>
                      </div>
                    </div>
                    <div className="mx-auto md:mx-0 h-8 w-8 rounded-full bg-primary-500 border-4 border-white flex items-center justify-center shadow-md order-0 md:order-2 my-4 md:my-0"></div>
                    <div className="md:w-1/2 md:pl-8 order-2 md:order-3"></div>
                  </div>
                </div>

                {/* Year 4 - Present */}
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8 order-1 md:order-0"></div>
                    <div className="mx-auto md:mx-0 h-8 w-8 rounded-full bg-primary-500 border-4 border-white flex items-center justify-center shadow-md order-0 md:order-1 my-4 md:my-0"></div>
                    <div className="md:w-1/2 md:pl-8 md:text-left order-2 md:order-2">
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2 text-primary-700">Present Day</h3>
                        <p className="text-gray-600">
                          Today, our school continues to thrive with a commitment to educational innovation, holistic development, and preparing students for future success in a global society.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in all areas of academic and personal development, setting high standards and pursuing continuous improvement.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Integrity</h3>
              <p className="text-gray-600">
                We foster honesty, ethics, and responsibility in all interactions, encouraging students to act with integrity in their academic and personal lives.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Innovation</h3>
              <p className="text-gray-600">
                We embrace creativity, critical thinking, and innovation, preparing students to adapt and thrive in a rapidly changing world.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Inclusivity</h3>
              <p className="text-gray-600">
                We celebrate diversity and create an inclusive environment where every student feels valued, respected, and empowered to succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Leader 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Dr. Jane Smith</h3>
                <p className="text-primary-600 font-medium mb-4">Principal</p>
                <p className="text-gray-600 mb-4">
                  Dr. Smith brings over 20 years of experience in education leadership, with a focus on innovative teaching methodologies and student-centered learning environments.
                </p>
                <p className="text-gray-500">
                  Ph.D. in Educational Leadership<br />
                  M.Ed. in Curriculum Development<br />
                  B.A. in Education
                </p>
              </div>
            </div>

            {/* Leader 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Prof. John Doe</h3>
                <p className="text-primary-600 font-medium mb-4">Vice Principal</p>
                <p className="text-gray-600 mb-4">
                  Prof. Doe specializes in curriculum development and technology integration, leading our school's digital transformation initiatives and academic excellence programs.
                </p>
                <p className="text-gray-500">
                  M.Ed. in Educational Technology<br />
                  B.Sc. in Mathematics<br />
                  Certified Educational Administrator
                </p>
              </div>
            </div>

            {/* Leader 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Ms. Sarah Johnson</h3>
                <p className="text-primary-600 font-medium mb-4">Academic Director</p>
                <p className="text-gray-600 mb-4">
                  Ms. Johnson oversees academic programs and student development initiatives, ensuring that our curriculum meets the highest standards and addresses diverse learning needs.
                </p>
                <p className="text-gray-500">
                  M.A. in Educational Psychology<br />
                  B.A. in Child Development<br />
                  Advanced Certification in Curriculum Design
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/staff" className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-300">
              View All Staff
            </Link>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="bg-gray-50 py-16 rounded-lg mb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="bg-gray-300 h-64 rounded-lg mb-6"></div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">State-of-the-Art Classrooms</h3>
              <p className="text-gray-600">
                Our modern classrooms are equipped with the latest educational technology, providing an optimal learning environment for students. Features include interactive whiteboards, high-speed internet connectivity, and ergonomic furniture designed for student comfort and collaboration.
              </p>
            </div>
            <div>
              <div className="bg-gray-300 h-64 rounded-lg mb-6"></div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Science & Computer Labs</h3>
              <p className="text-gray-600">
                Our well-equipped science and computer laboratories provide students with hands-on learning experiences. The labs are designed to foster experimentation, critical thinking, and practical application of theoretical concepts across various scientific disciplines and technology fields.
              </p>
            </div>
            <div>
              <div className="bg-gray-300 h-64 rounded-lg mb-6"></div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Library & Resource Center</h3>
              <p className="text-gray-600">
                Our comprehensive library houses a vast collection of books, journals, and digital resources. The space is designed to inspire a love for reading and self-directed learning, with comfortable reading areas, study carrels, and multimedia stations for research and project work.
              </p>
            </div>
            <div>
              <div className="bg-gray-300 h-64 rounded-lg mb-6"></div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Sports & Recreation</h3>
              <p className="text-gray-600">
                Our school features extensive sports facilities, including indoor and outdoor play areas, sports fields, and specialized training spaces. These facilities support our physical education program and extracurricular sports activities, promoting fitness, teamwork, and healthy competition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <div className="bg-primary-700 text-white rounded-lg p-8 md:p-12">
            <div className="md:flex md:items-center md:justify-between">
              <div className="mb-6 md:mb-0 md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Join Our School Community?</h2>
                <p className="text-lg">
                  We invite you to visit our campus and discover the difference our educational approach can make in your child's life.
                </p>
              </div>
              <div className="md:w-1/3 md:text-right">
                <Link to="/contact" className="inline-block w-full md:w-auto px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 text-center">
                  Schedule a Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
