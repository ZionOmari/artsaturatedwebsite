import React from 'react';

interface AboutProps {
  grayscaleMode: boolean;
}

const About: React.FC<AboutProps> = ({ grayscaleMode }) => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              About Art Saturated
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg leading-relaxed">
                Welcome to Art Saturated, where we explore the intersection of 
                traditional artistry and modern digital expression. Our mission is to 
                create immersive experiences that challenge perception and inspire creativity.
              </p>
              <p>
                The grayscale effect you're experiencing represents our commitment to 
                showing art from different perspectives. Sometimes, removing color allows 
                us to see form, composition, and emotion more clearly.
              </p>
              <p>
                {grayscaleMode 
                  ? "You're currently viewing our site in grayscale mode - a unique way to appreciate the fundamental elements of visual design."
                  : "Switch to grayscale mode to experience how color removal can enhance your perception of artistic elements."
                }
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">100+</div>
                <div className="text-sm text-gray-600">Artworks</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Artists</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">5+</div>
                <div className="text-sm text-gray-600">Years</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
              grayscaleMode ? 'grayscale-effect' : ''
            }`}>
              <img
                src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Art studio workspace"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {grayscaleMode && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-gray-800">
                Hover to reveal colors
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;