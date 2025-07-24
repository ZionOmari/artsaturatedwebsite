import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import FeaturedWorks from '../components/FeaturedWorks';
import TechnologySection from '../components/TechnologySection';

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <FeaturedWorks />
      <TechnologySection />
    </motion.div>
  );
};

export default Home;