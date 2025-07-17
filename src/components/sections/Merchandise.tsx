import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { SAMPLE_PRODUCTS } from '../../utils/constants';
import Image from '../ui/Image';
import { formatPrice } from '../../utils/helpers';

const Merchandise: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} id="merchandise" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">
            Merchandise
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take home a piece of the Art Saturated experience with our curated collection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_PRODUCTS.slice(0, 4).map((product, index) => (
            <div
              key={product.id}
              className={`card overflow-hidden group ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
                aspectRatio="4:3"
                hoverEffect="zoom"
              />
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <button className="btn btn-primary text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Merchandise;