import { useState, useEffect, useRef } from 'react';
import { useVisualTheme } from '../context/VisualThemeContext';

interface UseImageLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  placeholderSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  applyThemeFilter?: boolean;
}

interface UseImageLazyLoadReturn {
  imageSrc: string;
  imageRef: React.RefObject<HTMLImageElement>;
  isLoaded: boolean;
  isInView: boolean;
  error: boolean;
  reload: () => void;
}

export const useImageLazyLoad = (
  src: string,
  options: UseImageLazyLoadOptions = {}
): UseImageLazyLoadReturn => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    placeholderSrc = '',
    onLoad,
    onError,
    applyThemeFilter = true,
  } = options;

  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const { theme, getFilterString } = useVisualTheme();

  // Intersection Observer for lazy loading
  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(imageElement);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(imageElement);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  // Load image when in view
  useEffect(() => {
    if (!isInView || !src) return;

    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      setError(false);
      onLoad?.();
    };

    img.onerror = () => {
      setError(true);
      onError?.();
    };

    img.src = src;
  }, [isInView, src, onLoad, onError]);

  // Apply theme filter to image
  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement || !applyThemeFilter) return;

    const filterString = getFilterString();
    imageElement.style.filter = filterString;
    imageElement.style.transition = `filter ${theme.animationDuration}ms ease-in-out`;
  }, [theme, getFilterString, applyThemeFilter]);

  const reload = () => {
    setIsLoaded(false);
    setError(false);
    setImageSrc(placeholderSrc);
    if (isInView && src) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
        onLoad?.();
      };
      img.onerror = () => {
        setError(true);
        onError?.();
      };
      img.src = src;
    }
  };

  return {
    imageSrc,
    imageRef,
    isLoaded,
    isInView,
    error,
    reload,
  };
};