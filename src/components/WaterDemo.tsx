import React from 'react';
import WaterEffect from './WaterEffect';

export const WaterDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <h1 className="text-white text-3xl font-bold mb-8">Water Physics Demo</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Large interactive water */}
        <div className="space-y-4">
          <h2 className="text-white text-xl font-semibold">Interactive Water Surface</h2>
          <p className="text-gray-300 text-sm">
            Click or move your mouse to create ripples! Watch the cursor clear the grey overlay.
          </p>
          <WaterEffect 
            width={600} 
            height={400} 
            className="rounded-lg border-2 border-gray-600 shadow-xl"
          />
        </div>

        {/* Smaller compact version */}
        <div className="space-y-4">
          <h2 className="text-white text-xl font-semibold">Compact Version</h2>
          <p className="text-gray-300 text-sm">
            Same physics, smaller size. Perfect for UI elements!
          </p>
          <WaterEffect 
            width={400} 
            height={300} 
            className="rounded-lg border-2 border-gray-600 shadow-xl"
          />
        </div>
      </div>

      {/* Usage instructions */}
      <div className="mt-12 bg-gray-800 rounded-lg p-6">
        <h3 className="text-white text-lg font-semibold mb-4">How It Works</h3>
        <div className="text-gray-300 space-y-2">
          <p>✨ <strong>Physics:</strong> Uses a simple but powerful wave equation for realistic water simulation</p>
          <p>🎯 <strong>Interaction:</strong> Click anywhere to create ripples</p>
          <p>🖱️ <strong>Cursor Effect:</strong> Mouse movement clears the grey overlay</p>
          <p>📱 <strong>Touch Friendly:</strong> Works on mobile devices</p>
          <p>⚡ <strong>Performance:</strong> Runs at 60fps even on slower devices</p>
        </div>
      </div>
    </div>
  );
};

export default WaterDemo;