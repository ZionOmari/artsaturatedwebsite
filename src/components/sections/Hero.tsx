import React from 'react';
import { useVisualTheme } from '../../context/VisualThemeContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import Image from '../ui/Image';

const Hero: React.FC = () => {
  const { isGrayscaleMode, theme } = useVisualTheme();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1920"
          alt="Abstract art background"
          className="w-full h-full object-cover"
          applyThemeFilter={true}
          priority={true}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight font-display">
          <span className={`transition-all duration-500 ${
            isGrayscaleMode ? 'text-gray-200' : 'text-white'
          }`}>
            Art Saturated
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Where creativity meets innovation. Experience art in a new dimension with our 
          <span className={`font-semibold transition-colors duration-500 ${
            isGrayscaleMode ? 'text-gray-100' : 'text-yellow-300'
          }`}>
            {isGrayscaleMode ? ' grayscale perspective' : ' vibrant collections'}
          </span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="btn btn-primary px-8 py-3 rounded-lg font-semibold transform hover:scale-105 shadow-lg">
            Explore Gallery
          </button>
          
          <button className={`btn btn-secondary px-8 py-3 rounded-lg font-semibold transform hover:scale-105 ${
            isGrayscaleMode 
              ? 'border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-gray-900' 
              : 'border-white text-white hover:bg-white hover:text-gray-900'
          }`}>
            Learn More
          </button>
        </div>

        {/* Theme Indicator */}
        {isGrayscaleMode && (
          <div className="mt-8 inline-flex items-center glassmorphism rounded-full px-4 py-2 text-sm">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2 animate-pulse"></div>
            Viewing in {theme.mode} mode
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${
          isGrayscaleMode ? 'border-gray-300' : 'border-white'
        }`}>
          <div className={`w-1 h-3 rounded-full mt-2 animate-pulse ${
            isGrayscaleMode ? 'bg-gray-300' : 'bg-white'
          }`}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;