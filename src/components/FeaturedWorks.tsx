import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, Heart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  description: string;
  image: string;
  views: number;
  likes: number;
  category: string;
}

const FeaturedWorks: React.FC = () => {
  // Mock data for featured artworks
  const featuredArtworks: Artwork[] = [
    {
      id: '1',
      title: 'Digital Dreams',
      artist: 'Alex Johnson',
      description: 'An immersive experience that responds to viewer emotions through AI-powered color generation.',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      views: 12500,
      likes: 890,
      category: 'Interactive'
    },
    {
      id: '2',
      title: 'Quantum Waves',
      artist: 'Maria Santos',
      description: 'A mesmerizing visualization of quantum physics principles through animated particle systems.',
      image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop',
      views: 8900,
      likes: 654,
      category: 'Generative'
    },
    {
      id: '3',
      title: 'Neural Garden',
      artist: 'David Chen',
      description: 'A living digital ecosystem that grows and evolves based on visitor interactions.',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&h=600&fit=crop',
      views: 15600,
      likes: 1200,
      category: 'AI Art'
    },
    {
      id: '4',
      title: 'Ethereal Landscapes',
      artist: 'Sarah Williams',
      description: 'Procedurally generated landscapes that shift between reality and imagination.',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop',
      views: 7200,
      likes: 478,
      category: 'Procedural'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-6">
            Featured <span className="text-primary-600">Artworks</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular interactive artworks that push the boundaries of digital creativity
          </p>
        </motion.div>

        {/* Artworks Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featuredArtworks.map((artwork) => (
            <motion.div
              key={artwork.id}
              variants={cardVariants}
              className="group card overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link
                      to={`/artwork/${artwork.id}`}
                      className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-white transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Eye className="w-5 h-5" />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {artwork.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-semibold text-xl text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {artwork.title}
                </h3>
                
                <div className="flex items-center space-x-2 text-gray-600 mb-3">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{artwork.artist}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {artwork.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{artwork.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{artwork.likes.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/gallery" className="btn-primary group inline-flex items-center space-x-2">
            <span>View All Artworks</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWorks;