import React from 'react';

interface MerchProps {
  grayscaleMode: boolean;
}

const Merch: React.FC<MerchProps> = ({ grayscaleMode }) => {
  const products = [
    {
      id: 1,
      name: "Grayscale Collection T-Shirt",
      price: "$29.99",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Artistic Print Poster",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Creative Mug",
      price: "$14.99",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "Art Book Collection",
      price: "$39.99",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section id="merch" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Merchandise
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take home a piece of the Art Saturated experience with our curated collection.
            {grayscaleMode && " Products shown in grayscale for artistic effect."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-48 object-cover group-hover:scale-110 transition-all duration-500 ${
                    grayscaleMode ? 'grayscale-effect' : ''
                  }`}
                />
                {grayscaleMode && (
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-300"></div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    {product.price}
                  </span>
                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    grayscaleMode
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grayscale effect notice */}
        {grayscaleMode && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-gray-800 text-white rounded-full px-6 py-3 text-sm">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 animate-ping"></div>
              Products shown with grayscale effect - actual items are in full color
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Merch;