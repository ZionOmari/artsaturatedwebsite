import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Merch from '../components/Merch';

interface ShopProps {
  isSaturated?: boolean;
}

const Shop: React.FC<ShopProps> = ({ isSaturated = false }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Back Navigation */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate('/')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            isSaturated
              ? 'bg-crayola-white/20 text-crayola-white hover:bg-crayola-white/30 border border-crayola-white/30'
              : 'bg-gray-800/80 text-gray-200 hover:bg-gray-700/80 border border-gray-600/50'
          } backdrop-blur-md`}
        >
          <ArrowLeft size={20} />
          Back to Portfolio
        </button>
      </div>

      {/* Shop Content */}
      <div className="pt-20">
        <Merch isSaturated={isSaturated} />
      </div>
    </div>
  );
};

export default Shop; 