import React, { useEffect, useState, useRef } from 'react';

const Connect: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: '📸', 
      url: '#', 
      color: 'from-pink-500 to-purple-500' 
    },
    { 
      name: 'Twitter', 
      icon: '🐦', 
      url: '#', 
      color: 'from-blue-400 to-cyan-500' 
    },
    { 
      name: 'Discord', 
      icon: '💬', 
      url: '#', 
      color: 'from-indigo-500 to-purple-500' 
    },
    { 
      name: 'YouTube', 
      icon: '📺', 
      url: '#', 
      color: 'from-red-500 to-pink-500' 
    },
  ];

  return (
    <div ref={sectionRef} className="w-full max-w-6xl mx-auto px-4">
      <div 
        className={`text-container transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold seamless-text mb-6">
            Connect
            <span className="block text-3xl md:text-4xl font-light text-blue-300 mt-2">
              With Us
            </span>
          </h2>
          <p className="section-text seamless-text max-w-3xl mx-auto">
            Join our community of artists, collectors, and art enthusiasts. 
            Let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div 
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <h3 className="text-2xl font-semibold seamless-text mb-6 text-purple-300">
              Get in Touch
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block seamless-text text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg seamless-text placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-200"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label className="block seamless-text text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg seamless-text placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-200"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block seamless-text text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg seamless-text placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-200 resize-none"
                  placeholder="Tell us about your project or inquiry..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full glass-container py-4 text-lg font-semibold seamless-text interactive-card group"
              >
                <span className="group-hover:text-blue-300 transition-colors duration-200">
                  Send Message
                </span>
              </button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div 
            className={`transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            {/* Contact Information */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold seamless-text mb-6 text-cyan-300">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <p className="seamless-text font-medium">Email</p>
                    <p className="seamless-text text-gray-300">hello@artsaturated.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-xl">🌍</span>
                  </div>
                  <div>
                    <p className="seamless-text font-medium">Location</p>
                    <p className="seamless-text text-gray-300">Global Digital Presence</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-xl">⏰</span>
                  </div>
                  <div>
                    <p className="seamless-text font-medium">Response Time</p>
                    <p className="seamless-text text-gray-300">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-2xl font-semibold seamless-text mb-6 text-pink-300">
                Follow Us
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className={`glass-container p-4 interactive-card group text-center bg-gradient-to-r ${social.color} bg-opacity-10 hover:bg-opacity-20 transition-all duration-300`}
                  >
                    <div className="text-2xl mb-2">{social.icon}</div>
                    <p className="seamless-text font-medium group-hover:text-white transition-colors duration-200">
                      {social.name}
                    </p>
                  </a>
                ))}
              </div>
              
              <div className="mt-8 glass-container p-6 text-center">
                <h4 className="text-lg font-semibold seamless-text mb-3">
                  Join Our Community
                </h4>
                <p className="seamless-text text-gray-300 text-sm mb-4">
                  Connect with artists, collectors, and fellow art enthusiasts 
                  from around the world.
                </p>
                <button className="glass-container px-6 py-3 font-semibold seamless-text hover:text-purple-300 transition-colors duration-200">
                  Join Discord Server
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;