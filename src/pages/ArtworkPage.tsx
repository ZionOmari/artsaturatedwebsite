import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Eye, Heart, User, Calendar, Tag } from 'lucide-react';

const ArtworkPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock artwork data (in a real app, this would be fetched based on ID)
  const artwork = {
    id: '1',
    title: 'Digital Dreams',
    artist: 'Alex Johnson',
    description: 'An immersive experience that responds to viewer emotions through AI-powered color generation. This groundbreaking piece uses advanced computer vision to detect facial expressions and biometric data, translating human emotions into vibrant, ever-changing color patterns that dance across a large-scale LED installation.',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=800&fit=crop',
    views: 12500,
    likes: 890,
    category: 'Interactive',
    year: 2024,
    dimensions: '12ft x 8ft',
    medium: 'LED Installation, AI, Computer Vision',
    location: 'Main Gallery'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16 bg-white"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-primary-600 text-white px-4 py-2 rounded-full font-medium">
                {artwork.category}
              </span>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
                {artwork.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-gray-600 mb-6">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{artwork.artist}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{artwork.year}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-gray-500 mb-8">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>{artwork.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>{artwork.likes.toLocaleString()} likes</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-xl text-gray-900 mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {artwork.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Dimensions</h4>
                <p className="text-gray-600">{artwork.dimensions}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Medium</h4>
                <p className="text-gray-600">{artwork.medium}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                <p className="text-gray-600">{artwork.location}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-primary-600" />
                  <span className="text-gray-600">{artwork.category}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="btn-primary flex-1">
                Experience Now
              </button>
              <button className="btn-secondary">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtworkPage;