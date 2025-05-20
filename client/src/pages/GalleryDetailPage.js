import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const GalleryDetailPage = () => {
  const { slug } = useParams();
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`/api/gallery/${slug}`);
        setGallery(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching gallery details:', err);
        setError('Failed to load gallery. Please try again later.');
        setLoading(false);
        
        // For demo purposes, add mock data if the API call fails
        if (slug === 'annual-day-2023') {
          setGallery({
            id: 1,
            title: 'Annual Day 2023',
            description: 'Highlights from our annual celebration with performances, awards, and celebrations. Students showcased their talents in music, dance, and drama. The event was attended by parents, teachers, and distinguished guests.',
            date: '2023-12-15',
            images: [
              {
                original: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                description: 'Students performing on stage'
              },
              {
                original: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                description: 'Award ceremony for academic excellence'
              },
              {
                original: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                thumbnail: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                description: 'Group photo of the organizing committee'
              }
            ]
          });
        } else if (slug === 'sports-day-2023') {
          setGallery({
            id: 2,
            title: 'Sports Day 2023',
            description: 'Students participating in various sports activities including track events, team sports, and individual competitions. The day showcased the athletic talents of our students across different age groups.',
            date: '2023-11-10',
            images: [
              {
                original: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                description: 'Students at the starting line'
              },
              {
                original: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                thumbnail: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                description: 'Basketball tournament final match'
              },
              {
                original: 'https://images.unsplash.com/photo-1518604666860-9cd181d0ae29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                thumbnail: 'https://images.unsplash.com/photo-1518604666860-9cd181d0ae29?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                description: 'Medal ceremony for junior athletes'
              }
            ]
          });
        } else {
          setGallery({
            id: 3,
            title: 'School Event',
            description: 'Photos from school events and activities.',
            date: '2023-10-05',
            images: [
              {
                original: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                description: 'Students participating in activities'
              },
              {
                original: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                thumbnail: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                description: 'Group activities in the classroom'
              }
            ]
          });
        }
      }
    };

    fetchGallery();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading gallery...</p>
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

  if (!gallery) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Gallery not found</h2>
          <p className="mt-2 text-gray-600">The gallery you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{gallery.title}</h1>
        <p className="text-gray-600 mb-2">{new Date(gallery.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
        <p className="text-gray-700">{gallery.description}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        {gallery.images && gallery.images.length > 0 ? (
          <ImageGallery 
            items={gallery.images} 
            showPlayButton={true}
            showFullscreenButton={true}
            showThumbnails={true}
            showBullets={false}
          />
        ) : (
          <p className="text-center text-gray-600">No images found in this gallery.</p>
        )}
      </div>
    </div>
  );
};

export default GalleryDetailPage;
