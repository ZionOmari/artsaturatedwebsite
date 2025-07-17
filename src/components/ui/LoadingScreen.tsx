import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="mb-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 font-display">
          Art Saturated
        </h2>
        <p className="text-gray-600">
          Loading your visual experience...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;