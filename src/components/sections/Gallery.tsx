import React, { useState } from 'react';
import { useVisualTheme } from '../../context/VisualThemeContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { SAMPLE_ARTWORKS } from '../../utils/constants';
import Image from '../ui/Image';

const Gallery: React.FC = () => {
  const { isGrayscaleMode } = useVisualTheme();
  const { ref, isVisible } = useScrollAnimation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id="gallery"
      className="py-16 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">
            Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of artistic works. 
            {isGrayscaleMode && " Currently viewing with theme effects - hover to reveal colors."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_ARTWORKS.slice(0, 6).map((artwork, index) => (
            <div
              key={artwork.id}
              className={`group cursor-pointer ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(selectedImage === artwork.id ? null : artwork.id)}
            >
              <div className="card overflow-hidden">
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-64 object-cover"
                  aspectRatio="4:3"
                  hoverEffect="zoom"
                  overlay={true}
                  overlayContent={
                    <div className="text-white">
                      <h3 className="font-semibold text-lg mb-1">
                        {artwork.title}
                      </h3>
                      <p className="text-sm text-gray-200">
                        by {artwork.artist}
                      </p>
                    </div>
                  }
                />
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {artwork.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {artwork.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {artwork.artist}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                      {artwork.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Theme Controls */}
        {isGrayscaleMode && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-white rounded-lg p-4 shadow-md">
              <span className="text-sm text-gray-600 mr-4">Grayscale Effects Active</span>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;