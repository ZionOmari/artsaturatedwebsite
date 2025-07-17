import React, { useState } from 'react';

interface ConnectProps {
  grayscaleMode: boolean;
}

const Connect: React.FC<ConnectProps> = ({ grayscaleMode }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { email, message });
    setEmail('');
    setMessage('');
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: '📷',
      url: '#',
      color: 'from-pink-500 to-orange-500'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: '#',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: '#',
      color: 'from-blue-600 to-blue-800'
    },
    {
      name: 'YouTube',
      icon: '📺',
      url: '#',
      color: 'from-red-500 to-red-700'
    }
  ];

  return (
    <section id="connect" className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Connect With Us
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join our community of artists and art enthusiasts. 
            {grayscaleMode && " Experience our social presence in grayscale aesthetic."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-300 ${
                    grayscaleMode 
                      ? 'bg-gray-800 border border-gray-600 text-gray-200 focus:border-gray-400' 
                      : 'bg-gray-800 border border-gray-600 text-white focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-300 ${
                    grayscaleMode 
                      ? 'bg-gray-800 border border-gray-600 text-gray-200 focus:border-gray-400' 
                      : 'bg-gray-800 border border-gray-600 text-white focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                  placeholder="Tell us what's on your mind..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  grayscaleMode
                    ? 'bg-gray-600 hover:bg-gray-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Follow Our Journey</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className={`group flex items-center p-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    grayscaleMode 
                      ? 'bg-gray-800 hover:bg-gray-700 grayscale' 
                      : `bg-gradient-to-r ${social.color} hover:shadow-lg`
                  }`}
                >
                  <span className="text-2xl mr-3">{social.icon}</span>
                  <span className="font-medium">{social.name}</span>
                </a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className={`p-6 rounded-lg ${grayscaleMode ? 'bg-gray-800' : 'bg-gray-800/50'} backdrop-blur-sm`}>
              <h4 className="font-semibold mb-3">Stay Updated</h4>
              <p className="text-gray-300 text-sm mb-4">
                Get the latest updates on new artworks, exhibitions, and grayscale design insights.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`flex-1 px-3 py-2 rounded text-sm transition-all duration-300 ${
                    grayscaleMode 
                      ? 'bg-gray-700 border border-gray-600 text-gray-200' 
                      : 'bg-gray-700 border border-gray-600 text-white'
                  } focus:outline-none focus:border-blue-500`}
                />
                <button className={`px-4 py-2 rounded text-sm font-medium transition-all duration-300 ${
                  grayscaleMode
                    ? 'bg-gray-600 hover:bg-gray-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Art Saturated. All rights reserved. 
            {grayscaleMode && " | Viewing in Grayscale Mode"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Connect;