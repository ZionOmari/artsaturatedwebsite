import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { SOCIAL_LINKS } from '../../utils/constants';

const Connect: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} id="connect" className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold mb-4 font-display">
            Connect With Us
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join our community of artists and art enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SOCIAL_LINKS.map((social, index) => (
            <a
              key={social.platform}
              href={social.url}
              className={`group flex flex-col items-center p-4 rounded-lg transition-all duration-300 transform hover:scale-105 bg-gray-800 hover:bg-gray-700 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-2xl mb-2">{social.icon}</span>
              <span className="text-sm font-medium">{social.platform}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Connect;