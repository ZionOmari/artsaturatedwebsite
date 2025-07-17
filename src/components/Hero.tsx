import React from 'react';

interface HeroProps {
  grayscaleMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ grayscaleMode }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Grayscale Effect */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ${
          grayscaleMode ? 'grayscale-active' : 'grayscale-inactive'
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          <span className={`transition-all duration-500 ${grayscaleMode ? 'text-gray-200' : 'text-white'}`}>
            Art Saturated
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Where creativity meets innovation. Experience art in a new dimension with our 
          <span className={`font-semibold ${grayscaleMode ? 'text-gray-100' : 'text-yellow-300'} transition-colors duration-500`}>
            {grayscaleMode ? ' grayscale perspective' : ' vibrant collections'}
          </span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Explore Gallery
          </button>
          
          <button className={`px-8 py-3 border-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
            grayscaleMode 
              ? 'border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-gray-900' 
              : 'border-white text-white hover:bg-white hover:text-gray-900'
          }`}>
            Learn More
          </button>
        </div>

        {/* Grayscale mode indicator */}
        {grayscaleMode && (
          <div className="mt-8 inline-flex items-center bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2 animate-pulse"></div>
            Viewing in Grayscale Mode
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${
          grayscaleMode ? 'border-gray-300' : 'border-white'
        }`}>
          <div className={`w-1 h-3 rounded-full mt-2 animate-pulse ${
            grayscaleMode ? 'bg-gray-300' : 'bg-white'
          }`}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;