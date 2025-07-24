import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, Eye, Heart, User } from 'lucide-react';
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
  year: number;
}

const Gallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data for artworks
  const artworks: Artwork[] = [
    {
      id: '1',
      title: 'Digital Dreams',
      artist: 'Alex Johnson',
      description: 'An immersive experience that responds to viewer emotions through AI-powered color generation.',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      views: 12500,
      likes: 890,
      category: 'Interactive',
      year: 2024
    },
    {
      id: '2',
      title: 'Quantum Waves',
      artist: 'Maria Santos',
      description: 'A mesmerizing visualization of quantum physics principles through animated particle systems.',
      image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop',
      views: 8900,
      likes: 654,
      category: 'Generative',
      year: 2024
    },
    {
      id: '3',
      title: 'Neural Garden',
      artist: 'David Chen',
      description: 'A living digital ecosystem that grows and evolves based on visitor interactions.',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&h=600&fit=crop',
      views: 15600,
      likes: 1200,
      category: 'AI Art',
      year: 2024
    },
    {
      id: '4',
      title: 'Ethereal Landscapes',
      artist: 'Sarah Williams',
      description: 'Procedurally generated landscapes that shift between reality and imagination.',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop',
      views: 7200,
      likes: 478,
      category: 'Procedural',
      year: 2023
    },
    {
      id: '5',
      title: 'Chromatic Symphony',
      artist: 'Elena Rodriguez',
      description: 'Music visualization that transforms sound into dynamic color patterns in real-time.',
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop',
      views: 9800,
      likes: 720,
      category: 'Interactive',
      year: 2023
    },
    {
      id: '6',
      title: 'Data Streams',
      artist: 'Michael Park',
      description: 'Live data visualization that creates abstract art from global internet traffic patterns.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      views: 6500,
      likes: 543,
      category: 'Data Art',
      year: 2023
    }
  ];

  const categories = ['all', 'Interactive', 'Generative', 'AI Art', 'Procedural', 'Data Art'];

  // Filter artworks based on search and category
  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || artwork.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16 bg-gray-50"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-display font-bold text-4xl md:text-6xl text-gray-900 mb-6">
            Art <span className="text-primary-600">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of interactive digital artworks that blend technology with creativity
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search artworks, artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredArtworks.length} of {artworks.length} artworks
          </p>
        </div>

        {/* Artworks Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${selectedCategory}-${searchTerm}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }
          >
            {filteredArtworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                variants={itemVariants}
                layout
                className={`group ${viewMode === 'grid' ? 'card overflow-hidden' : 'card p-6'}`}
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Grid View */}
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
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {artwork.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-xl text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {artwork.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-gray-600 mb-3">
                        <User className="w-4 h-4" />
                        <span className="text-sm">{artwork.artist}</span>
                        <span className="text-sm">• {artwork.year}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {artwork.description}
                      </p>
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
                  </>
                ) : (
                  <>
                    {/* List View */}
                    <div className="flex gap-6">
                      <div className="flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden">
                        <img
                          src={artwork.image}
                          alt={artwork.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-xl text-gray-900 group-hover:text-primary-600 transition-colors">
                            {artwork.title}
                          </h3>
                          <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                            {artwork.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 mb-3">
                          <User className="w-4 h-4" />
                          <span className="text-sm">{artwork.artist}</span>
                          <span className="text-sm">• {artwork.year}</span>
                        </div>
                        <p className="text-gray-600 mb-4">
                          {artwork.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{artwork.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{artwork.likes.toLocaleString()}</span>
                            </div>
                          </div>
                          <Link
                            to={`/artwork/${artwork.id}`}
                            className="btn-secondary flex items-center space-x-2"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredArtworks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="font-semibold text-xl text-gray-900 mb-2">No artworks found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Gallery;