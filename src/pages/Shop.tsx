import React from 'react';

const Shop: React.FC = () => {
  const categories = [
    { name: 'Art', icon: '🎨', description: 'Original artwork and prints' },
    { name: 'Records', icon: '💿', description: 'Vinyl records and music' },
    { name: 'Tapes', icon: '📼', description: 'Cassette tapes and mixtapes' },
    { name: 'VHS', icon: '📹', description: 'Vintage video content' },
    { name: 'Clothing', icon: '👕', description: 'Apparel and accessories' }
  ];

  return (
    <div 
      className="min-h-screen p-8"
      style={{
        background: 'linear-gradient(45deg, #ff6b35, #ff8c42, #ffa726, #ff9800)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12 drop-shadow-lg">
          Shop Categories
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 hover:scale-105">
              <div className="text-center space-y-4">
                <div className="text-4xl">{category.icon}</div>
                <h3 className="text-xl font-bold text-white drop-shadow-md">{category.name}</h3>
                <p className="text-white/90 drop-shadow-sm">{category.description}</p>
                <button className="w-full py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30 hover:scale-105">
                  Browse {category.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
