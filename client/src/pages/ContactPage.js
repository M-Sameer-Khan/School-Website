import React, { useState } from 'react';
import Card from '../components/common/Card';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This would typically send data to your API
    // For now, let's simulate a successful form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message. We will get back to you shortly!'
    });

    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-800 mb-2">Contact Us</h1>
        <p className="text-gray-600">Get in touch with THE YES SCHOOLING SYSTEM</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-primary-700 mb-6">School Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-primary-600 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Address</h3>
                  <p className="text-gray-600 mt-1">Plot # D-2, Kaaj Muhammad Goth, Liyari,<br />Taiser Town, Karachi</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-primary-600 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Phone</h3>
                  <p className="text-gray-600 mt-1">0314-2315538, 0311-8410539</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-primary-600 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Email</h3>
                  <p className="text-gray-600 mt-1">theyesschoolingsystem@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-primary-600 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Office Hours</h3>
                  <p className="text-gray-600 mt-1">8:00 am to 9:00 pm</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="mt-8 rounded-lg overflow-hidden shadow-md">
              <h3 className="font-medium text-gray-800 mb-2">Our Location</h3>
              <div className="w-full h-80 relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.399890406242!2d67.03249091574959!3d24.952232184017647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb340c11c25f705%3A0x3fad5cd0ce7f8ba!2sTHE%20YES%20SCHOOLING%20SYSTEM!5e0!3m2!1sen!2s!4v1653673987654!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="School Location Map"
                  className="rounded-lg"
                ></iframe>
              </div>
              <div className="mt-2 text-sm text-primary-600">
                <a href="https://maps.app.goo.gl/pckbpnU1GdTpXeKg8" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary-800">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"></path>
                  </svg>
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Form */}
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-primary-700 mb-6">Send Us a Message</h2>
            
            {formStatus.submitted && (
              <div className={`mb-6 p-4 rounded-md ${formStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {formStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-1">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
