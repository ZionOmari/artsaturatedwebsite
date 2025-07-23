import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/neustalgicgrooves',
      icon: Instagram,
      color: 'hover:text-pink-400',
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/neustalgicgrooves',
      icon: Facebook,
      color: 'hover:text-blue-400',
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@neustalgicgrooves',
      icon: Youtube,
      color: 'hover:text-red-400',
    },
  ];

  const quickLinks = [
    { path: '/classes', label: 'Classes' },
    { path: '/instructors', label: 'Instructors' },
    { path: '/signup', label: 'Join Now' },
    { path: '/private-lessons', label: 'Private Lessons' },
    { path: '/sponsorship', label: 'Sponsorship' },
    { path: '/scholarship', label: 'Scholarships' },
  ];

  const scheduleItems = [
    { day: 'Monday', classes: 'Kids Breaking (5:30-6:30), Funk Styles (6:30-7:30)' },
    { day: 'Wednesday', classes: 'Adult Breaking (5:30-6:30), Funk Styles (6:30-7:30)' },
  ];

  return (
    <footer className="bg-dark-900 border-t border-dark-800">
      <div className="container-max">
        <div className="section-padding">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">NG</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold gradient-text">NeustalgicGrooves</h3>
                  <p className="text-xs text-dark-400">Dance Studio</p>
                </div>
              </div>
              <p className="text-dark-300 text-sm mb-6">
                Where vintage vibes meet modern moves. Join our community of dancers and discover your groove.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-dark-400 ${social.color} transition-colors duration-200`}
                      aria-label={social.name}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-dark-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Schedule */}
            <div>
              <h4 className="text-white font-semibold mb-4">Class Schedule</h4>
              <div className="space-y-3">
                {scheduleItems.map((item) => (
                  <div key={item.day}>
                    <p className="text-primary-400 font-medium text-sm">{item.day}</p>
                    <p className="text-dark-300 text-xs">{item.classes}</p>
                  </div>
                ))}
              </div>
              <p className="text-accent-400 text-sm mt-4 font-medium">$80/month unlimited</p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-primary-400" />
                  <a
                    href="mailto:info@neustalgicgrooves.com"
                    className="text-dark-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    info@neustalgicgrooves.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-primary-400" />
                  <a
                    href="tel:+1234567890"
                    className="text-dark-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    (123) 456-7890
                  </a>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin size={16} className="text-primary-400 mt-0.5" />
                  <address className="text-dark-300 text-sm not-italic">
                    123 Dance Street<br />
                    Groove City, GC 12345
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-dark-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-dark-400 text-sm">
                © {new Date().getFullYear()} NeustalgicGrooves. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link
                  to="/privacy"
                  className="text-dark-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-dark-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 