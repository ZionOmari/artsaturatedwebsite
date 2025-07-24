import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16 bg-white"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-display font-bold text-4xl md:text-6xl text-gray-900 mb-6">
            About <span className="text-primary-600">ArtSaturated</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pioneering the future of interactive digital art through cutting-edge technology and boundless creativity.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto prose prose-lg">
          <p>
            ArtSaturated represents a new frontier in digital art, where technology becomes the canvas 
            and interaction becomes the brush. Our mission is to create immersive experiences that 
            respond to human presence, emotion, and imagination in real-time.
          </p>
          
          <p>
            Founded in 2023, we bring together artists, technologists, and visionaries who believe 
            that art should be a living, breathing experience that evolves with each viewer. 
            Through artificial intelligence, computer vision, and advanced sensors, we create 
            artworks that are never the same twice.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;