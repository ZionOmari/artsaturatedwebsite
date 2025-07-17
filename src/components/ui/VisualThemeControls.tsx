import React, { useState } from 'react';
import { useVisualTheme } from '../../context/VisualThemeContext';
import { THEME_PRESETS } from '../../utils/constants';
import { VisualMode, GrayscaleIntensity } from '../../types';

interface VisualThemeControlsProps {
  className?: string;
  compact?: boolean;
  showPresets?: boolean;
  showAdvanced?: boolean;
}

const VisualThemeControls: React.FC<VisualThemeControlsProps> = ({
  className = '',
  compact = false,
  showPresets = true,
  showAdvanced = false,
}) => {
  const {
    theme,
    setMode,
    setIntensity,
    setContrast,
    setBrightness,
    setAnimationDuration,
    updateTheme,
    resetTheme,
    toggleGrayscale,
    isGrayscaleMode,
  } = useVisualTheme();

  const [showAdvancedControls, setShowAdvancedControls] = useState(showAdvanced);

  const modes: { value: VisualMode; label: string; icon: string }[] = [
    { value: 'color', label: 'Color', icon: '🎨' },
    { value: 'grayscale', label: 'Grayscale', icon: '⚫' },
    { value: 'sepia', label: 'Sepia', icon: '📸' },
    { value: 'blue-filter', label: 'Blue Filter', icon: '🔵' },
  ];

  const intensityOptions: { value: GrayscaleIntensity; label: string }[] = [
    { value: 0, label: '0%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
  ];

  const handlePresetChange = (presetName: string) => {
    const preset = THEME_PRESETS[presetName as keyof typeof THEME_PRESETS];
    if (preset) {
      updateTheme(preset);
    }
  };

  const handleModeChange = (mode: VisualMode) => {
    setMode(mode);
    // Auto-adjust intensity based on mode
    if (mode !== 'color' && theme.intensity === 0) {
      setIntensity(100);
    }
  };

  if (compact) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <button
          onClick={toggleGrayscale}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            isGrayscaleMode
              ? 'bg-gray-800 text-white'
              : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50'
          }`}
          title={isGrayscaleMode ? 'Switch to Color Mode' : 'Switch to Grayscale Mode'}
        >
          {isGrayscaleMode ? '🎨 Color' : '⚫ Grayscale'}
        </button>
        
        {isGrayscaleMode && (
          <select
            value={theme.intensity}
            onChange={(e) => setIntensity(Number(e.target.value) as GrayscaleIntensity)}
            className="px-2 py-1 text-sm border border-gray-300 rounded"
          >
            {intensityOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Visual Theme Controls</h3>
        <button
          onClick={resetTheme}
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Mode Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Visual Mode
        </label>
        <div className="grid grid-cols-2 gap-2">
          {modes.map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => handleModeChange(value)}
              className={`flex items-center justify-center p-3 rounded-md text-sm font-medium transition-all duration-300 ${
                theme.mode === value
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Intensity Control */}
      {theme.mode !== 'color' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Intensity: {theme.intensity}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="25"
            value={theme.intensity}
            onChange={(e) => setIntensity(Number(e.target.value) as GrayscaleIntensity)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
      )}

      {/* Presets */}
      {showPresets && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Quick Presets
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(THEME_PRESETS).map(([name, preset]) => (
              <button
                key={name}
                onClick={() => handlePresetChange(name)}
                className={`p-2 text-xs font-medium rounded transition-all duration-300 ${
                  JSON.stringify(theme) === JSON.stringify(preset)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title={`Apply ${name} preset`}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Controls Toggle */}
      <div className="mb-4">
        <button
          onClick={() => setShowAdvancedControls(!showAdvancedControls)}
          className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          <span className={`transform transition-transform duration-200 mr-2 ${
            showAdvancedControls ? 'rotate-90' : ''
          }`}>
            ▶
          </span>
          Advanced Controls
        </button>
      </div>

      {/* Advanced Controls */}
      {showAdvancedControls && (
        <div className="space-y-4 pl-4 border-l-2 border-gray-200">
          {/* Contrast */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contrast: {theme.contrast.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={theme.contrast}
              onChange={(e) => setContrast(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0.5</span>
              <span>1.0</span>
              <span>2.0</span>
            </div>
          </div>

          {/* Brightness */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brightness: {theme.brightness.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.1"
              value={theme.brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0.5</span>
              <span>1.0</span>
              <span>1.5</span>
            </div>
          </div>

          {/* Animation Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Animation Speed: {theme.animationDuration}ms
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              value={theme.animationDuration}
              onChange={(e) => setAnimationDuration(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Fast</span>
              <span>Normal</span>
              <span>Slow</span>
            </div>
          </div>
        </div>
      )}

      {/* Current Theme Info */}
      <div className="mt-6 p-3 bg-gray-50 rounded-md">
        <div className="text-sm text-gray-600">
          <div><strong>Mode:</strong> {theme.mode}</div>
          {theme.mode !== 'color' && (
            <div><strong>Intensity:</strong> {theme.intensity}%</div>
          )}
          <div><strong>Contrast:</strong> {theme.contrast.toFixed(1)}</div>
          <div><strong>Brightness:</strong> {theme.brightness.toFixed(1)}</div>
        </div>
      </div>
    </div>
  );
};

export default VisualThemeControls;