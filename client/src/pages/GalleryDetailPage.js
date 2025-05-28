import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../components/common/Spinner';

const GalleryDetailPage = () => {
  const { slug } = useParams();
  const [gallery, setGallery] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // This would typically fetch from your API
    // For now, let's use sample data
    setTimeout(() => {
      // Sample gallery data based on slug
      const galleryData = {
        'arts-competition-2025': {
          id: 1,
          title: 'Arts Competition 2025',
          description: 'Showcasing the creative talents of our students in the annual arts competition.',
          eventDate: '2025-05-23',
          images: [
            // Adding all 72 arts competition images
            ...[...Array(72)].map((_, index) => ({
              id: index + 1,
              src: `/images/gallery/arts-competition-2025/IMG_20250523_${index < 10 ? '1000' : '10'}${index < 10 ? index + '0' : index}_${index < 10 ? '631' : Math.floor(Math.random() * 1000)}.jpg`,
              alt: `Arts Competition Photo ${index + 1}`,
              caption: `Student artwork from the annual arts competition`
            }))
          ]
        },
        'annual-function-2025': {
          id: 2,
          title: 'Annual Function 2025',
          description: 'Highlights from our Annual Function with performances and award ceremonies.',
          eventDate: '2025-04-12',
          images: [
            // First 12 images are in IMG_XXXX.JPG format
            ...[...Array(12)].map((_, index) => ({
              id: index + 1,
              src: `/images/gallery/annual-function-2025/IMG_0${383 + index}.JPG`,
              alt: `Annual Function Photo ${index + 1}`,
              caption: `Students and staff participating in the annual function`
            })),
            // Next 3 images are in IMG_99XX.JPG format
            ...[...Array(3)].map((_, index) => ({
              id: index + 13,
              src: `/images/gallery/annual-function-2025/IMG_99${index < 10 ? '0' : ''}${4 + index}.JPG`,
              alt: `Annual Function Photo ${index + 13}`,
              caption: `Students and staff participating in the annual function`
            })),
            // Last 10 images are in IMG_20250412_XXXXXX.jpg format
            ...[...Array(10)].map((_, index) => ({
              id: index + 16,
              src: `/images/gallery/annual-function-2025/IMG_20250412_${165634 + index * 5000}.jpg`,
              alt: `Annual Function Photo ${index + 16}`,
              caption: `Students and staff participating in the annual function`
            }))
          ]
        },
        'practical-2025': {
          id: 3,
          title: 'Practical Lab Experiments 2025',
          description: 'Documentation of various lab experiments conducted by our students in 2025.',
          eventDate: '2025-03-24',
          images: Array(12).fill().map((_, index) => ({
            id: index + 1,
            src: `/images/gallery/practical-2025/lab-experiment-${index + 1}.jpg`,
            alt: `Lab Experiment Photo ${index + 1}`,
            caption: `Students conducting laboratory experiment ${index + 1}`
          }))
        },
        'orange-day-2025': {
          id: 4,
          title: 'Orange Day 2025',
          description: 'Celebrating Orange Day with colorful activities and events.',
          eventDate: '2025-03-10',
          images: Array(13).fill().map((_, index) => ({
            id: index + 1,
            src: `/images/gallery/orange-day-2025/IMG_0${111 + index}.JPG`,
            alt: `Orange Day Photo ${index + 1}`,
            caption: `Students celebrating Orange Day with vibrant activities`
          }))
        },
        'teachers-training-2025': {
          id: 5,
          title: 'Teachers Training 2025',
          description: 'Professional development sessions for our dedicated teaching staff.',
          eventDate: '2025-02-15',
          images: Array(33).fill().map((_, index) => ({
            id: index + 1,
            src: `/images/gallery/teachers-training-2025/Snapchat-${(index + 1) * 100000000}.jpg`,
            alt: `Teachers Training Photo ${index + 1}`,
            caption: `Staff professional development session ${index + 1}`
          }))
        },
        'arts-day-2025': {
          id: 6,
          title: 'Arts Day 2025',
          description: 'A day dedicated to celebrating arts and creativity in our school.',
          eventDate: '2025-01-18',
          images: Array(28).fill().map((_, index) => ({
            id: index + 1,
            src: `/images/gallery/arts-day-2025/IMG-20250118-WA00${19 + index}.jpg`,
            alt: `Arts Day Photo ${index + 1}`,
            caption: `Creative expressions during Arts Day celebrations`
          }))
        },
        'picnic-2023': {
          id: 7,
          title: 'Student Picnic 2023',
          description: 'Fun-filled educational trip for our students to explore and learn.',
          eventDate: '2023-11-15',
          images: Array(19).fill().map((_, index) => ({
            id: index + 1,
            src: `/images/gallery/picnic-2023/IMG_${6974 + index * 50}.JPG`,
            alt: `Student Picnic Photo ${index + 1}`,
            caption: `Students enjoying educational picnic activities`
          }))
        }
      };

      const currentGallery = galleryData[slug];
      
      if (currentGallery) {
        setGallery(currentGallery);
        setImages(currentGallery.images);
      } else {
        setError('Gallery not found');
      }
      
      setLoading(false);
    }, 1000);
  }, [slug]);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  if (loading) return <Spinner />;

  if (error || !gallery) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Gallery Not Found</h2>
        <p className="text-gray-600 mb-6">The gallery you're looking for doesn't exist or has been removed.</p>
        <Link to="/gallery" className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors">
          Back to All Galleries
        </Link>
      </div>
    );
  }

  return (
    <div className="gallery-detail-page">
      {/* Gallery Header */}
      <div className="mb-8">
        <Link to="/gallery" className="text-primary-600 hover:text-primary-800 mb-2 inline-block">
          &larr; Back to All Galleries
        </Link>
        <h1 className="text-3xl font-bold text-primary-800 mb-2">{gallery.title}</h1>
        <p className="text-gray-500 mb-4">
          {new Date(gallery.eventDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <p className="text-gray-600">{gallery.description}</p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
            onClick={() => openLightbox(image)}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-40 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
            >
              &times;
            </button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <p className="text-white text-center mt-4">{selectedImage.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryDetailPage;
