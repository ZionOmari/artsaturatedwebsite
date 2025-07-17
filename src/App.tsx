import React, { useEffect, useState } from 'react';
import { VisualThemeProvider } from './context/VisualThemeContext';
import { useCurrentSection } from './hooks/useScrollAnimation';
import Navigation from './components/layout/Navigation';
import Hero from './components/sections/Hero';
import Gallery from './components/sections/Gallery';
import About from './components/sections/About';
import Merchandise from './components/sections/Merchandise';
import Connect from './components/sections/Connect';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import LoadingScreen from './components/ui/LoadingScreen';
import './styles/index.css';

const SECTION_IDS = ['home', 'gallery', 'about', 'merchandise', 'connect'];

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const currentSection = useCurrentSection(SECTION_IDS);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update document title based on current section
    const sectionTitles: { [key: string]: string } = {
      home: 'Art Saturated - Interactive Art Portfolio',
      gallery: 'Gallery - Art Saturated',
      about: 'About - Art Saturated',
      merchandise: 'Merchandise - Art Saturated',
      connect: 'Connect - Art Saturated',
    };

    if (currentSection && sectionTitles[currentSection]) {
      document.title = sectionTitles[currentSection];
    }
  }, [currentSection]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation currentSection={currentSection} />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <Hero />

        {/* Gallery Section */}
        <Gallery />

        {/* About Section */}
        <About />

        {/* Merchandise Section */}
        <Merchandise />

        {/* Connect Section */}
        <Connect />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <VisualThemeProvider autoSave={true}>
      <AppContent />
    </VisualThemeProvider>
  );
}

export default App;