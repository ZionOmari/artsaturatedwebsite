import React, { useEffect, useState, useRef } from 'react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="w-full max-w-6xl mx-auto px-4">
      <div 
        className={`text-container transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        {/* Section Title */}
        <h2 className="text-5xl md:text-6xl font-bold seamless-text text-center mb-8">
          About
          <span className="block text-3xl md:text-4xl font-light text-blue-300 mt-2">
            The Vision
          </span>
        </h2>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Story */}
          <div 
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <h3 className="text-2xl font-semibold seamless-text mb-4 text-purple-300">
              Our Story
            </h3>
            <p className="seamless-text leading-relaxed mb-6">
              Art Saturated was born from the belief that art should be an immersive, 
              transformative experience. We create digital spaces where creativity 
              knows no bounds and imagination becomes reality.
            </p>
            <p className="seamless-text leading-relaxed">
              Every piece in our collection is carefully curated to evoke emotion, 
              challenge perspectives, and create meaningful connections between 
              the viewer and the art.
            </p>
          </div>

          {/* Mission */}
          <div 
            className={`transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            <h3 className="text-2xl font-semibold seamless-text mb-4 text-cyan-300">
              Our Mission
            </h3>
            <ul className="space-y-3">
              <li className="seamless-text leading-relaxed flex items-start">
                <span className="text-pink-400 mr-3">•</span>
                Democratize access to extraordinary digital art experiences
              </li>
              <li className="seamless-text leading-relaxed flex items-start">
                <span className="text-pink-400 mr-3">•</span>
                Support emerging and established digital artists worldwide
              </li>
              <li className="seamless-text leading-relaxed flex items-start">
                <span className="text-pink-400 mr-3">•</span>
                Push the boundaries of what's possible in digital art
              </li>
              <li className="seamless-text leading-relaxed flex items-start">
                <span className="text-pink-400 mr-3">•</span>
                Create a community of art enthusiasts and collectors
              </li>
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transform transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {[
            { number: '500+', label: 'Artworks' },
            { number: '150+', label: 'Artists' },
            { number: '50K+', label: 'Collectors' },
            { number: '25+', label: 'Countries' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold seamless-text bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-sm md:text-base seamless-text text-gray-300 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;