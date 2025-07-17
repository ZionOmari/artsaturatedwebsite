import React, { useState, useRef, useEffect } from 'react';
import { useImageLazyLoad } from '../../hooks/useImageLazyLoad';
import { useVisualTheme } from '../../context/VisualThemeContext';
import { generatePlaceholderImage } from '../../utils/helpers';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholderSrc?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  applyThemeFilter?: boolean;
  hoverEffect?: 'zoom' | 'brightness' | 'scale' | 'none';
  overlay?: boolean;
  overlayContent?: React.ReactNode;
  aspectRatio?: 'square' | '16:9' | '4:3' | '3:2' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  priority?: boolean;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholderSrc,
  loading = 'lazy',
  onLoad,
  onError,
  applyThemeFilter = true,
  hoverEffect = 'none',
  overlay = false,
  overlayContent,
  aspectRatio = 'auto',
  objectFit = 'cover',
  priority = false,
}) => {
  const { theme, isGrayscaleMode, getFilterString } = useVisualTheme();
  const [showOverlay, setShowOverlay] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate placeholder if not provided
  const defaultPlaceholder = placeholderSrc || (width && height ? 
    generatePlaceholderImage(width, height, 'Loading...') : '');

  const {
    imageSrc,
    imageRef,
    isLoaded,
    isInView,
    error,
    reload,
  } = useImageLazyLoad(src, {
    threshold: 0.1,
    rootMargin: '50px',
    placeholderSrc: defaultPlaceholder,
    onLoad,
    onError,
    applyThemeFilter: false, // We'll handle this manually for more control
  });

  // Handle manual filter application
  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement || !applyThemeFilter) return;

    if (isGrayscaleMode) {
      const filterString = getFilterString();
      imageElement.style.filter = filterString;
      imageElement.style.transition = `filter ${theme.animationDuration}ms ease-in-out`;
    } else {
      imageElement.style.filter = 'none';
    }
  }, [theme, isGrayscaleMode, getFilterString, applyThemeFilter]);

  // Aspect ratio classes
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square': return 'aspect-square';
      case '16:9': return 'aspect-video';
      case '4:3': return 'aspect-[4/3]';
      case '3:2': return 'aspect-[3/2]';
      default: return '';
    }
  };

  // Hover effect classes
  const getHoverEffectClass = () => {
    switch (hoverEffect) {
      case 'zoom': return 'image-zoom hover:scale-105';
      case 'brightness': return 'hover:brightness-110';
      case 'scale': return 'hover:scale-110';
      default: return '';
    }
  };

  // Container classes
  const containerClasses = [
    'image-container',
    'relative',
    'overflow-hidden',
    getAspectRatioClass(),
    className,
  ].filter(Boolean).join(' ');

  // Image classes
  const imageClasses = [
    'w-full',
    'h-full',
    `object-${objectFit}`,
    getHoverEffectClass(),
    'transition-all duration-300 ease-in-out',
    isLoaded ? 'opacity-100' : 'opacity-0',
  ].filter(Boolean).join(' ');

  // Loading placeholder classes
  const placeholderClasses = [
    'w-full',
    'h-full',
    'skeleton',
    'absolute',
    'inset-0',
    'bg-gray-200',
    isLoaded ? 'opacity-0' : 'opacity-100',
    'transition-opacity duration-300',
  ].filter(Boolean).join(' ');

  const handleMouseEnter = () => {
    if (overlay) setShowOverlay(true);
  };

  const handleMouseLeave = () => {
    if (overlay) setShowOverlay(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (overlay) setShowOverlay(!showOverlay);
    }
  };

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={overlay ? 0 : undefined}
      role={overlay ? 'button' : undefined}
      aria-label={overlay ? `View details for ${alt}` : undefined}
    >
      {/* Loading placeholder */}
      {!isLoaded && !error && (
        <div className={placeholderClasses}>
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            {defaultPlaceholder ? (
              <img
                src={defaultPlaceholder}
                alt=""
                className="w-full h-full object-cover opacity-50"
              />
            ) : (
              <div className="text-center">
                <svg 
                  className="w-12 h-12 mx-auto mb-2" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span className="text-sm">Loading...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500">
          <svg 
            className="w-12 h-12 mb-2" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
              clipRule="evenodd" 
            />
          </svg>
          <span className="text-sm text-center px-2">Failed to load image</span>
          <button
            onClick={reload}
            className="mt-2 px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Main image */}
      {!error && (
        <img
          ref={imageRef}
          src={imageSrc || defaultPlaceholder}
          alt={alt}
          width={width}
          height={height}
          className={imageClasses}
          loading={priority ? 'eager' : loading}
          decoding="async"
        />
      )}

      {/* Overlay */}
      {overlay && (
        <div
          className={`image-overlay transition-opacity duration-300 ${
            showOverlay ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {overlayContent && (
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {overlayContent}
            </div>
          )}
        </div>
      )}

      {/* Theme indicator */}
      {isGrayscaleMode && applyThemeFilter && isLoaded && (
        <div className="absolute top-2 right-2 px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
          {theme.mode === 'grayscale' && 'Grayscale'}
          {theme.mode === 'sepia' && 'Sepia'}
          {theme.mode === 'blue-filter' && 'Blue Filter'}
        </div>
      )}
    </div>
  );
};

export default Image;