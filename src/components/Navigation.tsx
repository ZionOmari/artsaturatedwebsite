import React from 'react';

interface NavigationProps {
  onGrayscaleToggle: () => void;
  grayscaleMode: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ onGrayscaleToggle, grayscaleMode }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Art Saturated</h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#home" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#gallery" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Gallery
              </a>
              <a href="#about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                About
              </a>
              <a href="#merch" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Merch
              </a>
              <a href="#connect" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Connect
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onGrayscaleToggle}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                grayscaleMode
                  ? 'bg-gray-800 text-white border border-gray-800'
                  : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {grayscaleMode ? '🎨 Color Mode' : '⚫ Grayscale Mode'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;