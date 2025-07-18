import React, { useEffect, useState, useRef } from 'react';

const Gallery: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'digital', label: 'Digital Art' },
    { id: 'abstract', label: 'Abstract' },
    { id: 'photography', label: 'Photography' },
    { id: 'mixed', label: 'Mixed Media' },
  ];

  const artworks = [
    { id: 1, title: 'Neon Dreams', artist: 'Alex Chen', category: 'digital', featured: true },
    { id: 2, title: 'Ocean Waves', artist: 'Maria Santos', category: 'abstract', featured: false },
    { id: 3, title: 'Urban Nights', artist: 'David Kim', category: 'photography', featured: false },
    { id: 4, title: 'Digital Fusion', artist: 'Sarah Johnson', category: 'mixed', featured: true },
    { id: 5, title: 'Color Symphony', artist: 'Tom Wilson', category: 'abstract', featured: false },
    { id: 6, title: 'Future Landscapes', artist: 'Nina Rodriguez', category: 'digital', featured: false },
    { id: 7, title: 'Light Studies', artist: 'James Park', category: 'photography', featured: true },
    { id: 8, title: 'Hybrid Reality', artist: 'Emma Davis', category: 'mixed', featured: false },
  ];

  const filteredArtworks = selectedCategory === 'all' 
    ? artworks 
    : artworks.filter(artwork => artwork.category === selectedCategory);

  return (
    <div ref={sectionRef} className="w-full max-w-7xl mx-auto px-4">
      {/* Section Header */}
      <div 
        className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <h2 className="text-5xl md:text-6xl font-bold seamless-text mb-6">
          Gallery
        </h2>
        <p className="section-text seamless-text max-w-3xl mx-auto mb-8">
          Explore our curated collection of digital masterpieces that push 
          the boundaries of creativity and imagination.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'glass-container text-blue-300 border border-blue-400/50'
                  : 'glass-container hover:border-white/30 seamless-text'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        {filteredArtworks.map((artwork, index) => (
          <div
            key={artwork.id}
            className={`group interactive-card glass-container p-6 ${
              artwork.featured ? 'md:col-span-2 lg:col-span-2 xl:col-span-2' : ''
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Artwork Preview */}
            <div 
              className={`bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg mb-4 ${
                artwork.featured ? 'h-64 md:h-80' : 'h-48'
              } flex items-center justify-center group-hover:from-purple-500/40 group-hover:to-blue-500/40 transition-all duration-300`}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 seamless-text" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="seamless-text text-sm opacity-75">Preview Coming Soon</p>
              </div>
            </div>

            {/* Artwork Info */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold seamless-text group-hover:text-blue-300 transition-colors duration-200">
                {artwork.title}
              </h3>
              <p className="seamless-text text-gray-300">
                by {artwork.artist}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs seamless-text bg-white/10 px-3 py-1 rounded-full capitalize">
                  {artwork.category.replace('_', ' ')}
                </span>
                {artwork.featured && (
                  <span className="text-xs seamless-text bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full text-black font-medium">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Hover Actions */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4 flex gap-2">
              <button className="flex-1 glass-container py-2 text-sm seamless-text hover:text-blue-300 transition-colors duration-200">
                View Details
              </button>
              <button className="glass-container px-4 py-2 text-sm seamless-text hover:text-purple-300 transition-colors duration-200">
                ♡
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div 
        className={`text-center mt-16 transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <button className="glass-container px-8 py-4 text-lg font-semibold seamless-text interactive-card">
          Load More Artworks
        </button>
      </div>
    </div>
  );
};

export default Gallery;