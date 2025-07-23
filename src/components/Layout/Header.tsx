import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Calendar } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/classes', label: 'Classes' },
    { path: '/instructors', label: 'Instructors' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/sponsorship', label: 'Sponsorship' },
    { path: '/contact', label: 'Contact' },
  ];

  const actionItems = [
    { path: '/signup', label: 'Join Now', icon: User, style: 'btn-primary' },
    { path: '/private-lessons', label: 'Private Lessons', icon: Calendar, style: 'btn-secondary' },
    { path: '/shop', label: 'Shop', icon: ShoppingBag, style: 'btn-outline' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">NG</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text">NeustalgicGrooves</h1>
              <p className="text-xs text-dark-400">Dance Studio</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-primary-400'
                    : 'text-dark-300 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {actionItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${item.style} text-sm px-4 py-2 flex items-center space-x-2`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-dark-300 hover:text-white transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-dark-800 border-t border-dark-700">
            <div className="px-4 py-6 space-y-6">
              {/* Navigation Links */}
              <nav className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-base font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-primary-400'
                        : 'text-dark-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-dark-700">
                {actionItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`${item.style} w-full justify-center flex items-center space-x-2`}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 