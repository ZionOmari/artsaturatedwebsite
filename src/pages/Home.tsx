import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Connect from '../components/Connect';

interface HomeProps {
  isSaturated: boolean;
  onSaturateToggle: () => void;
  isScreenClear: boolean;
}

const Home: React.FC<HomeProps> = ({ isSaturated, onSaturateToggle, isScreenClear }) => {
  const smoothScrollTo = (targetY: number, duration = 1000) => {
    const startY = window.pageYOffset;
    const difference = targetY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, startY + difference * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navigation
      smoothScrollTo(offsetTop);
    }
  };

  return (
    <>
      <Navigation 
        onSaturateToggle={onSaturateToggle} 
        isSaturated={isSaturated} 
        isScreenClear={isScreenClear}
      />
      <main>
        <Hero isSaturated={isSaturated} />
        <About isSaturated={isSaturated} />
        <Gallery isSaturated={isSaturated} />
        <Connect isSaturated={isSaturated} />
      </main>

      {/* Hidden Explore Button */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 30
      }}>
        <button
          onClick={() => scrollToSection('gallery')}
          className={`
            px-6 py-3 rounded-full font-bold text-lg
            transition-all duration-500 ease-out
            ${isSaturated 
              ? 'bg-crayola-white/20 text-crayola-white border-2 border-crayola-white/30 hover:bg-crayola-white/30' 
              : 'bg-gray-800/80 text-gray-200 border-2 border-gray-600/50 hover:bg-gray-700/80'
            }
            backdrop-blur-md shadow-lg hover:shadow-xl
            transform hover:scale-105
            opacity-0 hover:opacity-100
            translate-y-4 hover:translate-y-0
          `}
        >
          ✨ Explore
        </button>
      </div>
    </>
  );
};

export default Home; 