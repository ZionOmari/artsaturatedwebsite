import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Merch from './components/Merch';
import Connect from './components/Connect';
import SaturateEffect from './components/SaturateEffect';

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect for background
  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden custom-scrollbar">
      {/* Background Layer - Fixed behind all content */}
      <div className="layer-background">
        <SaturateEffect scrollOffset={parallaxOffset} />
        <div 
          className="background-visual"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        />
      </div>

      {/* Navigation Layer - Always on top */}
      <div className="layer-navigation">
        <Navigation />
      </div>

      {/* Content Layer - Text and information in front */}
      <div className="layer-content">
        <main className="relative">
          {/* Hero Section */}
          <section id="hero" className="min-h-screen flex items-center justify-center">
            <Hero />
          </section>

          {/* About Section */}
          <section id="about" className="min-h-screen flex items-center justify-center py-20">
            <About />
          </section>

          {/* Gallery Section */}
          <section id="gallery" className="min-h-screen py-20">
            <Gallery />
          </section>

          {/* Merch Section */}
          <section id="merch" className="min-h-screen flex items-center justify-center py-20">
            <Merch />
          </section>

          {/* Connect Section */}
          <section id="connect" className="min-h-screen flex items-center justify-center py-20">
            <Connect />
          </section>
        </main>
      </div>

      {/* Overlay Layer - For modals, notifications, etc. */}
      <div className="layer-overlay">
        {/* Space for future modal/overlay content */}
      </div>
    </div>
  );
};

export default App;