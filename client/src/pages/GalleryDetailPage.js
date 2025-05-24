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
        'school-life': {
          id: 1,
          title: 'School Life',
          description: 'Scenes from daily life, events, and celebrations at THE YES SCHOOLING SYSTEM.',
          eventDate: '2025-05-22',
          images: [
            {
              id: 1,
              src: '/images/gallery/1688665679307.jpg',
              alt: 'School assembly with students lined up',
              caption: 'Morning assembly at THE YES SCHOOLING SYSTEM'
            },
            {
              id: 2,
              src: '/images/gallery/1688665684487.jpg',
              alt: 'School students in uniform',
              caption: 'Students in their school uniforms'
            },
            {
              id: 3,
              src: '/images/gallery/1688665705638.jpg',
              alt: 'School event celebration',
              caption: 'Special event celebration at the school'
            },
            {
              id: 4,
              src: '/images/gallery/1688665720896.jpg',
              alt: 'School gathering',
              caption: 'Students gathered for a special occasion'
            },
            {
              id: 5,
              src: '/images/gallery/1688665736894.jpg',
              alt: 'School celebration event',
              caption: 'Students celebrating a special day at school'
            },
            {
              id: 6,
              src: '/images/gallery/1688665750911.jpg',
              alt: 'School activity',
              caption: 'Students participating in school activities'
            },
            {
              id: 7,
              src: '/images/gallery/1688665758959.jpg',
              alt: 'School event',
              caption: 'School event with students and teachers'
            },
            {
              id: 8,
              src: '/images/gallery/1689741496894.jpg',
              alt: 'School gathering',
              caption: 'Students gathered for a special occasion'
            },
            {
              id: 9,
              src: '/images/gallery/1689741504525.jpg',
              alt: 'School activity',
              caption: 'Students participating in educational activities'
            },
            {
              id: 10,
              src: '/images/gallery/1689741540504.jpg',
              alt: 'School event',
              caption: 'Special event at THE YES SCHOOLING SYSTEM'
            },
            {
              id: 11,
              src: '/images/gallery/1689741569944.jpg',
              alt: 'School celebration',
              caption: 'Students celebrating at school'
            },
            {
              id: 12,
              src: '/images/gallery/IMG_20240830_094645.jpg',
              alt: 'School event August 2024',
              caption: 'Special event in August 2024'
            },
            {
              id: 13,
              src: '/images/gallery/IMG-20240830-WA0056.jpg',
              alt: 'School gathering August 2024',
              caption: 'School gathering in August 2024'
            },
            {
              id: 14,
              src: '/images/gallery/IMG-20241011-WA0009.jpg',
              alt: 'School event October 2024',
              caption: 'Special event in October 2024'
            },
            {
              id: 15,
              src: '/images/gallery/IMG_0120.JPG',
              alt: 'School photo',
              caption: 'Students at THE YES SCHOOLING SYSTEM'
            },
            {
              id: 16,
              src: '/images/gallery/IMG-20250118-WA0021.jpg',
              alt: 'School event January 2025',
              caption: 'School celebration in January 2025'
            },
            {
              id: 17,
              src: '/images/gallery/IMG-20250118-WA0030.jpg',
              alt: 'School gathering January 2025',
              caption: 'School gathering in January 2025'
            },
            {
              id: 18,
              src: '/images/gallery/IMG-20250118-WA0033.jpg',
              alt: 'School activity January 2025',
              caption: 'School activity in January 2025'
            },
            {
              id: 19,
              src: '/images/gallery/IMG-20250118-WA0037.jpg',
              alt: 'School event January 2025',
              caption: 'Special event in January 2025'
            },
            {
              id: 20,
              src: '/images/gallery/IMG-20250118-WA0038.jpg',
              alt: 'School celebration January 2025',
              caption: 'Celebration in January 2025'
            }
          ]
        },
        'annual-day-2025': {
          id: 2,
          title: 'Annual Day Celebration',
          description: 'Highlights from our Annual Day celebrations with performances and awards.',
          eventDate: '2025-03-15',
          images: Array(24).fill().map((_, index) => ({
            id: index + 1,
            src: `https://source.unsplash.com/random/800x600/?school,performance,${index}`,
            alt: `Annual Day Celebration Photo ${index + 1}`,
            caption: `Students performing at the Annual Day ${index % 3 === 0 ? 'dance' : index % 3 === 1 ? 'drama' : 'music'} event`
          }))
        },
        'sports-day-2025': {
          id: 2,
          title: 'Sports Day',
          description: 'Students participating in various sports activities and competitions.',
          eventDate: '2025-02-10',
          images: Array(36).fill().map((_, index) => ({
            id: index + 1,
            src: `https://source.unsplash.com/random/800x600/?school,sports,${index}`,
            alt: `Sports Day Photo ${index + 1}`,
            caption: `Students participating in ${index % 4 === 0 ? 'race' : index % 4 === 1 ? 'cricket' : index % 4 === 2 ? 'football' : 'basketball'}`
          }))
        },
        'science-exhibition-2025': {
          id: 3,
          title: 'Science Exhibition',
          description: 'Student projects and innovations at our annual science exhibition.',
          eventDate: '2025-01-20',
          images: Array(18).fill().map((_, index) => ({
            id: index + 1,
            src: `https://source.unsplash.com/random/800x600/?science,project,${index}`,
            alt: `Science Exhibition Photo ${index + 1}`,
            caption: `Student project on ${index % 3 === 0 ? 'renewable energy' : index % 3 === 1 ? 'robotics' : 'environmental science'}`
          }))
        },
        'independence-day-2024': {
          id: 4,
          title: 'Independence Day',
          description: 'Celebration of Pakistan Independence Day with cultural performances.',
          eventDate: '2024-08-14',
          images: Array(32).fill().map((_, index) => ({
            id: index + 1,
            src: `https://source.unsplash.com/random/800x600/?independence,celebration,${index}`,
            alt: `Independence Day Photo ${index + 1}`,
            caption: `Independence Day celebration ${index % 3 === 0 ? 'flag hoisting' : index % 3 === 1 ? 'cultural performance' : 'group photo'}`
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
