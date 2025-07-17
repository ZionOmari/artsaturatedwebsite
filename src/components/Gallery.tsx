import React, { useState } from 'react';

interface GalleryProps {
  grayscaleMode: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ grayscaleMode }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Sample images - replace with actual image paths
  const images = [
    {
      src: '/assets/images/SimpleScanStation20250422152626_2.jpg',
      alt: 'Artwork 1',
      title: 'Abstract Expression'
    },
    {
      src: '/assets/images/SimpleScanStation20250422152626_3.jpg',
      alt: 'Artwork 2',
      title: 'Digital Landscape'
    },
    {
      src: '/assets/images/SimpleScanStation20250422152626_4.jpg',
      alt: 'Artwork 3',
      title: 'Contemporary Study'
    },
    {
      src: '/assets/images/SimpleScanStation20250422152626_5.jpg',
      alt: 'Artwork 4',
      title: 'Modern Interpretation'
    }
  ];

  const getImageClassName = (index: number) => {
    let baseClass = 'w-full h-64 object-cover rounded-lg cursor-pointer transition-all duration-500';
    
    if (grayscaleMode) {
      baseClass += ' grayscale-effect';
    } else {
      baseClass += ' hover:scale-105 hover:shadow-xl';
    }
    
    if (selectedImage === index) {
      baseClass += ' ring-4 ring-blue-500 scale-105';
    }
    
    return baseClass;
  };

  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of artistic works. 
            {grayscaleMode && " Currently viewing in grayscale mode - hover to reveal colors."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative"
              onClick={() => setSelectedImage(selectedImage === index ? null : index)}
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={image.src}
                  alt={image.alt}
                  className={getImageClassName(index)}
                  onError={(e) => {
                    // Fallback for missing images
                    e.currentTarget.src = `https://via.placeholder.com/400x300/cccccc/666666?text=${encodeURIComponent(image.title)}`;
                  }}
                />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-semibold text-sm">
                  {image.title}
                </h3>
              </div>

              {/* Grayscale mode indicator */}
              {grayscaleMode && (
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Hover for color
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Grayscale controls */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 bg-white rounded-lg p-4 shadow-md">
            <span className="text-sm text-gray-600">Grayscale Effects:</span>
            <button
              className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
              onClick={() => {
                document.querySelectorAll('.gallery-image').forEach(img => {
                  img.classList.toggle('grayscale-partial');
                });
              }}
            >
              50% Gray
            </button>
            <button
              className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
              onClick={() => {
                document.querySelectorAll('.gallery-image').forEach(img => {
                  img.classList.toggle('grayscale-fade-in');
                });
              }}
            >
              Animated
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;