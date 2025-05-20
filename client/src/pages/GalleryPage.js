import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GalleryPage = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const res = await axios.get('/api/gallery');
        setGalleries(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching galleries:', err);
        setError('Failed to load galleries. Please try again later.');
        setLoading(false);
        
        // For demo purposes, add some mock data if the API call fails
        setGalleries([
          {
            id: 1,
            title: 'Annual Day 2023',
            description: 'Highlights from our annual celebration.',
            coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80',
            slug: 'annual-day-2023'
          },
          {
            id: 2,
            title: 'Sports Day 2023',
            description: 'Students participating in various sports activities.',
            coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80',
            slug: 'sports-day-2023'
          },
          {
            id: 3,
            title: 'Science Exhibition',
            description: 'Innovative projects by our young scientists.',
            coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80',
            slug: 'science-exhibition'
          },
          {
            id: 4,
            title: 'Cultural Fest',
            description: 'Celebrating diversity through art and performances.',
            coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80',
            slug: 'cultural-fest'
          }
        ]);
      }
    };

    fetchGalleries();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading galleries...</p>
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
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Photo Gallery</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our collection of memories captured during various school events and activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleries.map((gallery) => (
          <Link 
            to={`/gallery/${gallery.slug}`} 
            key={gallery.id}
            className="group block bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={gallery.coverImage}
                alt={gallery.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold">{gallery.title}</h3>
                  <p className="text-sm">{gallery.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
