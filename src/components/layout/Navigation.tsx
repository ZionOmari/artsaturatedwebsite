import React, { useState, useEffect } from 'react';
import { useVisualTheme } from '../../context/VisualThemeContext';
import { useSmoothScroll } from '../../hooks/useScrollAnimation';
import { NAVIGATION_ITEMS } from '../../utils/constants';
import VisualThemeControls from '../ui/VisualThemeControls';

interface NavigationProps {
  currentSection?: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection }) => {
  const { isGrayscaleMode, toggleGrayscale } = useVisualTheme();
  const { scrollToElement } = useSmoothScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showThemeControls, setShowThemeControls] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '');
    scrollToElement(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => scrollToElement('home')}
                className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
              >
                <span className="text-2xl">🎨</span>
                <span className="font-display">Art Saturated</span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {NAVIGATION_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-gray-900 relative ${
                    currentSection === item.id
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-600'
                  }`}
                >
                  {item.label}
                  {currentSection === item.id && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Theme Controls */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={toggleGrayscale}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  isGrayscaleMode
                    ? 'bg-gray-800 text-white shadow-md'
                    : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 shadow-sm'
                }`}
                title={isGrayscaleMode ? 'Switch to Color Mode' : 'Switch to Grayscale Mode'}
              >
                {isGrayscaleMode ? '🎨 Color' : '⚫ Grayscale'}
              </button>

              <button
                onClick={() => setShowThemeControls(!showThemeControls)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Advanced Theme Controls"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {NAVIGATION_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors rounded-md ${
                    currentSection === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <VisualThemeControls compact={true} className="px-3" />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Advanced Theme Controls Panel */}
      {showThemeControls && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm">
          <div className="fixed top-20 right-4 w-80">
            <VisualThemeControls
              showPresets={true}
              showAdvanced={true}
              className="relative"
            />
            <button
              onClick={() => setShowThemeControls(false)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;