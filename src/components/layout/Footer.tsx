import React from 'react';
import { useVisualTheme } from '../../context/VisualThemeContext';

const Footer: React.FC = () => {
  const { isGrayscaleMode } = useVisualTheme();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Art Saturated. All rights reserved. 
            {isGrayscaleMode && " | Viewing in Grayscale Mode"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;