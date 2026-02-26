import React from 'react';

const Home: React.FC = () => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(45deg, #ff6b35, #ff8c42, #ffa726, #ff9800)'
      }}
    >
      <div className="text-center space-y-8 p-8 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">
          Welcome to ArtSaturated
        </h1>
        <p className="text-xl text-white/90 max-w-2xl drop-shadow-md">
          Discover the intersection of art, technology, and creative expression
        </p>
        <button className="px-8 py-4 bg-white/20 text-white font-bold text-lg rounded-lg hover:bg-white/30 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/30 hover:scale-105">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
