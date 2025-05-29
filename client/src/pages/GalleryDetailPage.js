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
            // Arts competition images using the actual filenames
            { id: 1, src: '/images/gallery/arts-competition-2025/IMG_20250523_100657_631.jpg', alt: 'Arts Competition Photo 1', caption: 'Student artwork from the annual arts competition' },
            { id: 2, src: '/images/gallery/arts-competition-2025/IMG_20250523_100659_933.jpg', alt: 'Arts Competition Photo 2', caption: 'Student artwork from the annual arts competition' },
            { id: 3, src: '/images/gallery/arts-competition-2025/IMG_20250523_100709_566.jpg', alt: 'Arts Competition Photo 3', caption: 'Student artwork from the annual arts competition' },
            { id: 4, src: '/images/gallery/arts-competition-2025/IMG_20250523_100822_246.jpg', alt: 'Arts Competition Photo 4', caption: 'Student artwork from the annual arts competition' },
            { id: 5, src: '/images/gallery/arts-competition-2025/IMG_20250523_100829_939.jpg', alt: 'Arts Competition Photo 5', caption: 'Student artwork from the annual arts competition' },
            { id: 6, src: '/images/gallery/arts-competition-2025/IMG_20250523_100840_663.jpg', alt: 'Arts Competition Photo 6', caption: 'Student artwork from the annual arts competition' },
            { id: 7, src: '/images/gallery/arts-competition-2025/IMG_20250523_100855_666.jpg', alt: 'Arts Competition Photo 7', caption: 'Student artwork from the annual arts competition' },
            { id: 8, src: '/images/gallery/arts-competition-2025/IMG_20250523_100906_737.jpg', alt: 'Arts Competition Photo 8', caption: 'Student artwork from the annual arts competition' },
            { id: 9, src: '/images/gallery/arts-competition-2025/IMG_20250523_100918_149.jpg', alt: 'Arts Competition Photo 9', caption: 'Student artwork from the annual arts competition' },
            { id: 10, src: '/images/gallery/arts-competition-2025/IMG_20250523_100929_687.jpg', alt: 'Arts Competition Photo 10', caption: 'Student artwork from the annual arts competition' },
            { id: 11, src: '/images/gallery/arts-competition-2025/IMG_20250523_100945_052.jpg', alt: 'Arts Competition Photo 11', caption: 'Student artwork from the annual arts competition' },
            { id: 12, src: '/images/gallery/arts-competition-2025/IMG_20250523_100955_529.jpg', alt: 'Arts Competition Photo 12', caption: 'Student artwork from the annual arts competition' }
            // Note: Adding the first 12 images for now. More can be added with their actual filenames as needed.
          ]
        },
        'annual-function-2025': {
          id: 2,
          title: 'Annual Function 2025',
          description: 'Highlights from our Annual Function with performances and award ceremonies.',
          eventDate: '2025-04-12',
          images: [
            // Annual function images using actual filenames
            { id: 1, src: '/images/gallery/annual-function-2025/IMG_0383.JPG', alt: 'Annual Function Photo 1', caption: 'Students and staff participating in the annual function' },
            { id: 2, src: '/images/gallery/annual-function-2025/IMG_0389.JPG', alt: 'Annual Function Photo 2', caption: 'Students and staff participating in the annual function' },
            { id: 3, src: '/images/gallery/annual-function-2025/IMG_0421.JPG', alt: 'Annual Function Photo 3', caption: 'Students and staff participating in the annual function' },
            { id: 4, src: '/images/gallery/annual-function-2025/IMG_0432.JPG', alt: 'Annual Function Photo 4', caption: 'Students and staff participating in the annual function' },
            { id: 5, src: '/images/gallery/annual-function-2025/IMG_0451.JPG', alt: 'Annual Function Photo 5', caption: 'Students and staff participating in the annual function' },
            { id: 6, src: '/images/gallery/annual-function-2025/IMG_0454.JPG', alt: 'Annual Function Photo 6', caption: 'Students and staff participating in the annual function' },
            { id: 7, src: '/images/gallery/annual-function-2025/IMG_0460.JPG', alt: 'Annual Function Photo 7', caption: 'Students and staff participating in the annual function' },
            { id: 8, src: '/images/gallery/annual-function-2025/IMG_0489.JPG', alt: 'Annual Function Photo 8', caption: 'Students and staff participating in the annual function' },
            { id: 9, src: '/images/gallery/annual-function-2025/IMG_0494.JPG', alt: 'Annual Function Photo 9', caption: 'Students and staff participating in the annual function' },
            { id: 10, src: '/images/gallery/annual-function-2025/IMG_0505.JPG', alt: 'Annual Function Photo 10', caption: 'Students and staff participating in the annual function' },
            { id: 11, src: '/images/gallery/annual-function-2025/IMG_0535.JPG', alt: 'Annual Function Photo 11', caption: 'Students and staff participating in the annual function' },
            { id: 12, src: '/images/gallery/annual-function-2025/IMG_0652.JPG', alt: 'Annual Function Photo 12', caption: 'Students and staff participating in the annual function' },
            { id: 13, src: '/images/gallery/annual-function-2025/IMG_9904.JPG', alt: 'Annual Function Photo 13', caption: 'Students and staff participating in the annual function' },
            { id: 14, src: '/images/gallery/annual-function-2025/IMG_9907.JPG', alt: 'Annual Function Photo 14', caption: 'Students and staff participating in the annual function' },
            { id: 15, src: '/images/gallery/annual-function-2025/IMG_9958.JPG', alt: 'Annual Function Photo 15', caption: 'Students and staff participating in the annual function' },
            { id: 16, src: '/images/gallery/annual-function-2025/IMG_20250412_165634.jpg', alt: 'Annual Function Photo 16', caption: 'Students and staff participating in the annual function' },
            { id: 17, src: '/images/gallery/annual-function-2025/IMG_20250412_182552.jpg', alt: 'Annual Function Photo 17', caption: 'Students and staff participating in the annual function' },
            { id: 18, src: '/images/gallery/annual-function-2025/IMG_20250412_182803.jpg', alt: 'Annual Function Photo 18', caption: 'Students and staff participating in the annual function' },
            { id: 19, src: '/images/gallery/annual-function-2025/IMG_20250412_192156.jpg', alt: 'Annual Function Photo 19', caption: 'Students and staff participating in the annual function' },
            { id: 20, src: '/images/gallery/annual-function-2025/IMG_20250412_193616.jpg', alt: 'Annual Function Photo 20', caption: 'Students and staff participating in the annual function' },
            { id: 21, src: '/images/gallery/annual-function-2025/IMG_20250412_194107.jpg', alt: 'Annual Function Photo 21', caption: 'Students and staff participating in the annual function' },
            { id: 22, src: '/images/gallery/annual-function-2025/IMG_20250412_194910.jpg', alt: 'Annual Function Photo 22', caption: 'Students and staff participating in the annual function' },
            { id: 23, src: '/images/gallery/annual-function-2025/IMG_20250412_204849.jpg', alt: 'Annual Function Photo 23', caption: 'Students and staff participating in the annual function' },
            { id: 24, src: '/images/gallery/annual-function-2025/IMG_20250412_213441.jpg', alt: 'Annual Function Photo 24', caption: 'Students and staff participating in the annual function' },
            { id: 25, src: '/images/gallery/annual-function-2025/IMG-20250510-WA0051.jpg', alt: 'Annual Function Photo 25', caption: 'Students and staff participating in the annual function' }
          ]
        },
        'practical-2025': {
          id: 3,
          title: 'Practical Lab Experiments 2025',
          description: 'Documentation of various lab experiments conducted by our students in 2025.',
          eventDate: '2025-03-24',
          images: [
            // Since we don't have access to the actual filenames for this gallery yet,
            // we'll keep this as a placeholder and update it when the files are available
            { id: 1, src: '/images/gallery/practical-2025/lab-experiment-1.jpg', alt: 'Lab Experiment Photo 1', caption: 'Students conducting laboratory experiment 1' },
            { id: 2, src: '/images/gallery/practical-2025/lab-experiment-2.jpg', alt: 'Lab Experiment Photo 2', caption: 'Students conducting laboratory experiment 2' },
            { id: 3, src: '/images/gallery/practical-2025/lab-experiment-3.jpg', alt: 'Lab Experiment Photo 3', caption: 'Students conducting laboratory experiment 3' },
            { id: 4, src: '/images/gallery/practical-2025/lab-experiment-4.jpg', alt: 'Lab Experiment Photo 4', caption: 'Students conducting laboratory experiment 4' },
            { id: 5, src: '/images/gallery/practical-2025/lab-experiment-5.jpg', alt: 'Lab Experiment Photo 5', caption: 'Students conducting laboratory experiment 5' },
            { id: 6, src: '/images/gallery/practical-2025/lab-experiment-6.jpg', alt: 'Lab Experiment Photo 6', caption: 'Students conducting laboratory experiment 6' },
            { id: 7, src: '/images/gallery/practical-2025/lab-experiment-7.jpg', alt: 'Lab Experiment Photo 7', caption: 'Students conducting laboratory experiment 7' },
            { id: 8, src: '/images/gallery/practical-2025/lab-experiment-8.jpg', alt: 'Lab Experiment Photo 8', caption: 'Students conducting laboratory experiment 8' },
            { id: 9, src: '/images/gallery/practical-2025/lab-experiment-9.jpg', alt: 'Lab Experiment Photo 9', caption: 'Students conducting laboratory experiment 9' },
            { id: 10, src: '/images/gallery/practical-2025/lab-experiment-10.jpg', alt: 'Lab Experiment Photo 10', caption: 'Students conducting laboratory experiment 10' },
            { id: 11, src: '/images/gallery/practical-2025/lab-experiment-11.jpg', alt: 'Lab Experiment Photo 11', caption: 'Students conducting laboratory experiment 11' },
            { id: 12, src: '/images/gallery/practical-2025/lab-experiment-12.jpg', alt: 'Lab Experiment Photo 12', caption: 'Students conducting laboratory experiment 12' }
          ]
        },
        'orange-day-2025': {
          id: 4,
          title: 'Orange Day 2025',
          description: 'Celebrating Orange Day with colorful activities and events.',
          eventDate: '2025-03-10',
          images: [
            // Orange Day images using actual filenames
            { id: 1, src: '/images/gallery/orange-day-2025/IMG_0111.JPG', alt: 'Orange Day Photo 1', caption: 'Students celebrating Orange Day with vibrant activities' },
            { id: 2, src: '/images/gallery/orange-day-2025/IMG_0115.JPG', alt: 'Orange Day Photo 2', caption: 'Students celebrating Orange Day with vibrant activities' },
            { id: 3, src: '/images/gallery/orange-day-2025/IMG_0116.JPG', alt: 'Orange Day Photo 3', caption: 'Students celebrating Orange Day with vibrant activities' },
            { id: 4, src: '/images/gallery/orange-day-2025/IMG_0117.JPG', alt: 'Orange Day Photo 4', caption: 'Students celebrating Orange Day with vibrant activities' },
            { id: 5, src: '/images/gallery/orange-day-2025/IMG_0118.JPG', alt: 'Orange Day Photo 5', caption: 'Students celebrating Orange Day with vibrant activities' },
            { id: 6, src: '/images/gallery/orange-day-2025/IMG_0119.JPG', alt: 'Orange Day Photo 6', caption: 'Students celebrating Orange Day with vibrant activities' },
            { id: 7, src: '/images/gallery/orange-day-2025/IMG_0120.JPG', alt: 'Orange Day Photo 7', caption: 'Students celebrating Orange Day with vibrant activities' },
            { id: 8, src: '/images/gallery/orange-day-2025/IMG_0121.JPG', alt: 'Orange Day Photo 8', caption: 'Students celebrating Orange Day with vibrant activities' },
            { id: 9, src: '/images/gallery/orange-day-2025/IMG_0122.JPG', alt: 'Orange Day Photo 9', caption: 'Students celebrating Orange Day with vibrant activities' },
            { id: 10, src: '/images/gallery/orange-day-2025/IMG_0123.JPG', alt: 'Orange Day Photo 10', caption: 'Students celebrating Orange Day with vibrant activities' },
            { id: 11, src: '/images/gallery/orange-day-2025/IMG_0124.JPG', alt: 'Orange Day Photo 11', caption: 'Students celebrating Orange Day with vibrant activities' },
            { id: 12, src: '/images/gallery/orange-day-2025/IMG_0125.JPG', alt: 'Orange Day Photo 12', caption: 'Students celebrating Orange Day with vibrant activities' },
            { id: 13, src: '/images/gallery/orange-day-2025/IMG_0126.JPG', alt: 'Orange Day Photo 13', caption: 'Students celebrating Orange Day with vibrant activities' }
          ]
        },
        'teachers-training-2025': {
          id: 5,
          title: 'Teachers Training 2025',
          description: 'Professional development sessions for our dedicated teaching staff.',
          eventDate: '2025-02-15',
          images: [
            // Teachers training images using actual filenames
            { id: 1, src: '/images/gallery/teachers-training-2025/Snapchat-171612000.jpg', alt: 'Teachers Training Photo 1', caption: 'Staff professional development session 1' },
            { id: 2, src: '/images/gallery/teachers-training-2025/Snapchat-382204977.jpg', alt: 'Teachers Training Photo 2', caption: 'Staff professional development session 2' },
            { id: 3, src: '/images/gallery/teachers-training-2025/Snapchat-401937259.jpg', alt: 'Teachers Training Photo 3', caption: 'Staff professional development session 3' },
            { id: 4, src: '/images/gallery/teachers-training-2025/Snapchat-490652482.jpg', alt: 'Teachers Training Photo 4', caption: 'Staff professional development session 4' },
            { id: 5, src: '/images/gallery/teachers-training-2025/Snapchat-573438011.jpg', alt: 'Teachers Training Photo 5', caption: 'Staff professional development session 5' },
            { id: 6, src: '/images/gallery/teachers-training-2025/Snapchat-589552452.jpg', alt: 'Teachers Training Photo 6', caption: 'Staff professional development session 6' },
            { id: 7, src: '/images/gallery/teachers-training-2025/Snapchat-712337478.jpg', alt: 'Teachers Training Photo 7', caption: 'Staff professional development session 7' },
            { id: 8, src: '/images/gallery/teachers-training-2025/Snapchat-866762445.jpg', alt: 'Teachers Training Photo 8', caption: 'Staff professional development session 8' },
            { id: 9, src: '/images/gallery/teachers-training-2025/Snapchat-939019606.jpg', alt: 'Teachers Training Photo 9', caption: 'Staff professional development session 9' },
            { id: 10, src: '/images/gallery/teachers-training-2025/Snapchat-949878438.jpg', alt: 'Teachers Training Photo 10', caption: 'Staff professional development session 10' },
            { id: 11, src: '/images/gallery/teachers-training-2025/Snapchat-1012102945.jpg', alt: 'Teachers Training Photo 11', caption: 'Staff professional development session 11' },
            { id: 12, src: '/images/gallery/teachers-training-2025/Snapchat-1043459183.jpg', alt: 'Teachers Training Photo 12', caption: 'Staff professional development session 12' }
            // Note: Adding the first 12 images for now. More can be added with their actual filenames as needed.
          ]
        },
        'arts-day-2025': {
          id: 6,
          title: 'Arts Day 2025',
          description: 'A day dedicated to celebrating arts and creativity in our school.',
          eventDate: '2025-01-18',
          images: [
            // Arts Day images using actual filenames
            { id: 1, src: '/images/gallery/arts-day-2025/IMG-20250118-WA0019.jpg', alt: 'Arts Day Photo 1', caption: 'Creative expressions during Arts Day celebrations' },
            { id: 2, src: '/images/gallery/arts-day-2025/IMG-20250118-WA0021.jpg', alt: 'Arts Day Photo 2', caption: 'Creative expressions during Arts Day celebrations' },
            { id: 3, src: '/images/gallery/arts-day-2025/IMG-20250118-WA0022.jpg', alt: 'Arts Day Photo 3', caption: 'Creative expressions during Arts Day celebrations' },
            { id: 4, src: '/images/gallery/arts-day-2025/IMG-20250118-WA0023.jpg', alt: 'Arts Day Photo 4', caption: 'Creative expressions during Arts Day celebrations' },
            { id: 5, src: '/images/gallery/arts-day-2025/IMG-20250118-WA0024.jpg', alt: 'Arts Day Photo 5', caption: 'Creative expressions during Arts Day celebrations' },
            { id: 6, src: '/images/gallery/arts-day-2025/IMG-20250118-WA0025.jpg', alt: 'Arts Day Photo 6', caption: 'Creative expressions during Arts Day celebrations' },
            { id: 7, src: '/images/gallery/arts-day-2025/IMG-20250118-WA0026.jpg', alt: 'Arts Day Photo 7', caption: 'Creative expressions during Arts Day celebrations' },
            { id: 8, src: '/images/gallery/arts-day-2025/IMG-20250118-WA0027.jpg', alt: 'Arts Day Photo 8', caption: 'Creative expressions during Arts Day celebrations' },
            { id: 9, src: '/images/gallery/arts-day-2025/IMG-20250118-WA0028.jpg', alt: 'Arts Day Photo 9', caption: 'Creative expressions during Arts Day celebrations' },
            { id: 10, src: '/images/gallery/arts-day-2025/IMG-20250118-WA0029.jpg', alt: 'Arts Day Photo 10', caption: 'Creative expressions during Arts Day celebrations' },
            { id: 11, src: '/images/gallery/arts-day-2025/IMG-20250118-WA0030.jpg', alt: 'Arts Day Photo 11', caption: 'Creative expressions during Arts Day celebrations' },
            { id: 12, src: '/images/gallery/arts-day-2025/IMG-20250118-WA0031.jpg', alt: 'Arts Day Photo 12', caption: 'Creative expressions during Arts Day celebrations' }
            // Note: Adding the first 12 images for now. More can be added with their actual filenames as needed.
          ]
        },
        'picnic-2023': {
          id: 7,
          title: 'Student Picnic 2023',
          description: 'Fun-filled educational trip for our students to explore and learn.',
          eventDate: '2023-11-15',
          images: [
            // Student picnic images using actual filenames
            { id: 1, src: '/images/gallery/picnic-2023/IMG_6974.JPG', alt: 'Student Picnic Photo 1', caption: 'Students enjoying educational picnic activities' },
            { id: 2, src: '/images/gallery/picnic-2023/IMG_6979.JPG', alt: 'Student Picnic Photo 2', caption: 'Students enjoying educational picnic activities' },
            { id: 3, src: '/images/gallery/picnic-2023/IMG_7144.JPG', alt: 'Student Picnic Photo 3', caption: 'Students enjoying educational picnic activities' },
            { id: 4, src: '/images/gallery/picnic-2023/IMG_7235.JPG', alt: 'Student Picnic Photo 4', caption: 'Students enjoying educational picnic activities' },
            { id: 5, src: '/images/gallery/picnic-2023/IMG_7273.JPG', alt: 'Student Picnic Photo 5', caption: 'Students enjoying educational picnic activities' },
            { id: 6, src: '/images/gallery/picnic-2023/IMG_7328.JPG', alt: 'Student Picnic Photo 6', caption: 'Students enjoying educational picnic activities' },
            { id: 7, src: '/images/gallery/picnic-2023/IMG_7433.JPG', alt: 'Student Picnic Photo 7', caption: 'Students enjoying educational picnic activities' },
            { id: 8, src: '/images/gallery/picnic-2023/IMG_7444 - Copy.JPG', alt: 'Student Picnic Photo 8', caption: 'Students enjoying educational picnic activities' },
            { id: 9, src: '/images/gallery/picnic-2023/IMG_7526.JPG', alt: 'Student Picnic Photo 9', caption: 'Students enjoying educational picnic activities' },
            { id: 10, src: '/images/gallery/picnic-2023/IMG_7583.JPG', alt: 'Student Picnic Photo 10', caption: 'Students enjoying educational picnic activities' },
            { id: 11, src: '/images/gallery/picnic-2023/IMG_7596.JPG', alt: 'Student Picnic Photo 11', caption: 'Students enjoying educational picnic activities' },
            { id: 12, src: '/images/gallery/picnic-2023/IMG_7612.JPG', alt: 'Student Picnic Photo 12', caption: 'Students enjoying educational picnic activities' },
            { id: 13, src: '/images/gallery/picnic-2023/IMG_7643.JPG', alt: 'Student Picnic Photo 13', caption: 'Students enjoying educational picnic activities' },
            { id: 14, src: '/images/gallery/picnic-2023/IMG_7653.JPG', alt: 'Student Picnic Photo 14', caption: 'Students enjoying educational picnic activities' },
            { id: 15, src: '/images/gallery/picnic-2023/IMG_7658.JPG', alt: 'Student Picnic Photo 15', caption: 'Students enjoying educational picnic activities' },
            { id: 16, src: '/images/gallery/picnic-2023/IMG_7663.JPG', alt: 'Student Picnic Photo 16', caption: 'Students enjoying educational picnic activities' },
            { id: 17, src: '/images/gallery/picnic-2023/IMG_7738.JPG', alt: 'Student Picnic Photo 17', caption: 'Students enjoying educational picnic activities' },
            { id: 18, src: '/images/gallery/picnic-2023/IMG_7785.JPG', alt: 'Student Picnic Photo 18', caption: 'Students enjoying educational picnic activities' },
            { id: 19, src: '/images/gallery/picnic-2023/IMG_7805.JPG', alt: 'Student Picnic Photo 19', caption: 'Students enjoying educational picnic activities' }
          ]
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
