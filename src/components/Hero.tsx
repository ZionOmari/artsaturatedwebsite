import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full text-center px-4">
      {/* Main Hero Content */}
      <div 
        className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Main Title */}
        <h1 className="hero-text seamless-text mb-8 animate-fade-in">
          ART
          <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            SATURATED
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className={`section-text seamless-text max-w-4xl mx-auto mb-12 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Immerse yourself in a world where art transcends boundaries. 
          Experience visual storytelling that saturates your senses and ignites your imagination.
        </p>

        {/* Call to Action Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-6 justify-center items-center transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <button 
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            className="glass-container px-8 py-4 text-lg font-semibold seamless-text interactive-card group"
          >
            <span className="group-hover:text-blue-300 transition-colors duration-200">
              Explore Gallery
            </span>
          </button>
          
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-white/30 px-8 py-4 text-lg font-semibold seamless-text hover:bg-white/10 transition-all duration-200 rounded-xl"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-element absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/30 rounded-full blur-sm"></div>
        <div className="floating-element absolute top-1/3 right-1/4 w-6 h-6 bg-purple-400/20 rounded-full blur-sm" style={{ animationDelay: '2s' }}></div>
        <div className="floating-element absolute bottom-1/3 left-1/6 w-3 h-3 bg-pink-400/25 rounded-full blur-sm" style={{ animationDelay: '4s' }}></div>
        <div className="floating-element absolute bottom-1/4 right-1/6 w-5 h-5 bg-cyan-400/20 rounded-full blur-sm" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center space-y-2 animate-pulse-slow">
          <span className="text-sm seamless-text font-light tracking-wide">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;