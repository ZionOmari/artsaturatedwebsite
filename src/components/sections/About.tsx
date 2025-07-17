import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const About: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-display">
            About Art Saturated
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We explore the intersection of traditional artistry and modern digital expression, 
            creating immersive experiences that challenge perception and inspire creativity through 
            innovative grayscale effects and visual transformations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;