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
          title: 'Annual Day Celebration',
          slug: 'annual-day-2025',
          description: 'Highlights from our Annual Day celebrations with performances and awards.',
          coverImage: 'https://source.unsplash.com/random/600x400/?school,event',
          eventDate: '2025-03-15',
          imageCount: 24
        },
        {
          id: 2,
          title: 'Sports Day',
          slug: 'sports-day-2025',
          description: 'Students participating in various sports activities and competitions.',
          coverImage: 'https://source.unsplash.com/random/600x400/?school,sports',
          eventDate: '2025-02-10',
          imageCount: 36
        },
        {
          id: 3,
          title: 'Science Exhibition',
          slug: 'science-exhibition-2025',
          description: 'Student projects and innovations at our annual science exhibition.',
          coverImage: 'https://source.unsplash.com/random/600x400/?school,science',
          eventDate: '2025-01-20',
          imageCount: 18
        },
        {
          id: 4,
          title: 'Independence Day',
          slug: 'independence-day-2024',
          description: 'Celebration of Pakistan Independence Day with cultural performances.',
          coverImage: 'https://source.unsplash.com/random/600x400/?independence,flag',
          eventDate: '2024-08-14',
          imageCount: 32
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
