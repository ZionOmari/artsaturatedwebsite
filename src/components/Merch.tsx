import React, { useEffect, useState, useRef } from 'react';

const Merch: React.FC = () => {
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

  const products = [
    {
      id: 1,
      name: 'Digital Art Print Collection',
      price: '$49.99',
      description: 'High-quality prints of our most popular digital artworks',
      category: 'Prints',
      featured: true,
    },
    {
      id: 2,
      name: 'Art Saturated T-Shirt',
      price: '$29.99',
      description: 'Premium cotton tee with exclusive design',
      category: 'Apparel',
      featured: false,
    },
    {
      id: 3,
      name: 'NFT Access Pass',
      price: '$99.99',
      description: 'Exclusive access to limited edition NFT drops',
      category: 'Digital',
      featured: true,
    },
    {
      id: 4,
      name: 'Artist Collaboration Hoodie',
      price: '$59.99',
      description: 'Limited edition hoodie featuring artist collaborations',
      category: 'Apparel',
      featured: false,
    },
    {
      id: 5,
      name: 'Digital Wallpaper Pack',
      price: '$19.99',
      description: '50+ high-resolution wallpapers for all devices',
      category: 'Digital',
      featured: false,
    },
    {
      id: 6,
      name: 'Premium Membership',
      price: '$9.99/mo',
      description: 'Unlimited access to our growing collection',
      category: 'Subscription',
      featured: true,
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
            Merch
            <span className="block text-3xl md:text-4xl font-light text-purple-300 mt-2">
              & Collectibles
            </span>
          </h2>
          <p className="section-text seamless-text max-w-3xl mx-auto">
            Take a piece of the Art Saturated experience with you. From digital 
            collectibles to premium physical merchandise.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group interactive-card glass-container p-6 transform transition-all duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              } ${product.featured ? 'lg:col-span-2' : ''}`}
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              {/* Product Image Placeholder */}
              <div 
                className={`bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-lg mb-4 flex items-center justify-center group-hover:from-cyan-500/40 group-hover:to-purple-500/40 transition-all duration-300 ${
                  product.featured ? 'h-48' : 'h-32'
                }`}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 seamless-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="seamless-text text-xs opacity-75">Product Image</p>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold seamless-text group-hover:text-cyan-300 transition-colors duration-200">
                    {product.name}
                  </h3>
                  {product.featured && (
                    <span className="text-xs seamless-text bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 rounded-full text-black font-medium">
                      Popular
                    </span>
                  )}
                </div>
                
                <p className="seamless-text text-gray-300 text-sm leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs seamless-text bg-white/10 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-xl font-bold seamless-text bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {product.price}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 glass-container py-2 text-sm seamless-text hover:text-blue-300 transition-colors duration-200">
                    Add to Cart
                  </button>
                  <button className="glass-container px-4 py-2 text-sm seamless-text hover:text-purple-300 transition-colors duration-200">
                    ♡
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div 
          className={`text-center mt-16 transform transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="glass-container p-8 text-center">
            <h3 className="text-2xl font-bold seamless-text mb-4">
              Join Our Newsletter
            </h3>
            <p className="seamless-text text-gray-300 mb-6">
              Get notified about new releases, exclusive drops, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg seamless-text placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-200"
              />
              <button className="glass-container px-6 py-3 font-semibold seamless-text hover:text-blue-300 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merch;