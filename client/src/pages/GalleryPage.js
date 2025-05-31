import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';

const GalleryPage = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This would typically fetch from your API
    // For now, let's use sample data
    setTimeout(() => {
      const sampleGalleries = [
        {
          id: 1,
          title: 'Arts Competition 2025',
          slug: 'arts-competition-2025',
          description: 'Showcasing the creative talents of our students in the annual arts competition.',
          coverImage: '/images/gallery/arts-competition-2025/IMG_20250523_100657_631.jpg',
          eventDate: '2025-05-23',
          imageCount: 72
        },
        {
          id: 2,
          title: 'Annual Function 2025',
          slug: 'annual-function-2025',
          description: 'Highlights from our Annual Function with performances and award ceremonies.',
          coverImage: '/images/gallery/annual-function-2025/IMG_0383.JPG',
          eventDate: '2025-04-12',
          imageCount: 25
        },
        {
          id: 3,
          title: 'Practical Lab Experiments 2025',
          slug: 'practical-2025',
          description: 'Documentation of various lab experiments conducted by our students in 2025.',
          coverImage: '/images/gallery/practical-2025/lab-experiment-1.jpg',
          eventDate: '2025-03-24',
          imageCount: 12
        },
        {
          id: 4,
          title: 'Orange Day 2025',
          slug: 'orange-day-2025',
          description: 'Celebrating Orange Day with colorful activities and events.',
          coverImage: '/images/gallery/orange-day-2025/IMG_0111.JPG',
          eventDate: '2025-03-10',
          imageCount: 13
        },
        {
          id: 5,
          title: 'Teachers Training 2025',
          slug: 'teachers-training-2025',
          description: 'Professional development sessions for our dedicated teaching staff.',
          coverImage: '/images/gallery/teachers-training-2025/Snapchat-1012102945.jpg',
          eventDate: '2025-02-15',
          imageCount: 33
        },
        {
          id: 6,
          title: 'Arts Day 2025',
          slug: 'arts-day-2025',
          description: 'A day dedicated to celebrating arts and creativity in our school.',
          coverImage: '/images/gallery/arts-day-2025/IMG-20250118-WA0019.jpg',
          eventDate: '2025-01-18',
          imageCount: 28
        },
        {
          id: 7,
          title: 'Student Picnic 2023',
          slug: 'picnic-2023',
          description: 'Fun-filled educational trip for our students to explore and learn.',
          coverImage: '/images/gallery/picnic-2023/IMG_6974.JPG',
          eventDate: '2023-11-15',
          imageCount: 19
        }
      ];
      setGalleries(sampleGalleries);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Spinner />;

  if (error) return <div className="text-center text-red-600">Error loading galleries: {error}</div>;

  return (
    <div className="gallery-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-800 mb-2">Photo Gallery</h1>
        <p className="text-gray-600">Browse photos from our school events and activities</p>
      </div>

      {galleries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No photo galleries available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleries.map((gallery) => (
            <Link to={`/gallery/${gallery.slug}`} key={gallery.id}>
              <Card>
                <img 
                  src={gallery.coverImage} 
                  alt={gallery.title} 
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-primary-700">{gallery.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">
                    {new Date(gallery.eventDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-600 mb-4">{gallery.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{gallery.imageCount} photos</span>
                    <span className="text-primary-600 font-medium">View Gallery</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
