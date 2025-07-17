import { useState, useEffect, useRef, useCallback } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  onEnter?: () => void;
  onExit?: () => void;
}

interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
  hasTriggered: boolean;
  scrollY: number;
  scrollProgress: number;
}

export const useScrollAnimation = (
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn => {
  const {
    threshold = 0.3,
    rootMargin = '0px',
    triggerOnce = true,
    onEnter,
    onExit,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const ref = useRef<HTMLElement>(null);

  // Intersection Observer for visibility detection
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible;
          const isNowVisible = entry.isIntersecting;

          setIsVisible(isNowVisible);

          if (isNowVisible && !wasVisible) {
            setHasTriggered(true);
            onEnter?.();
          } else if (!isNowVisible && wasVisible && !triggerOnce) {
            onExit?.();
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, onEnter, onExit, isVisible]);

  // Scroll position tracking
  const updateScrollPosition = useCallback(() => {
    const currentScrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight > 0 ? currentScrollY / documentHeight : 0;

    setScrollY(currentScrollY);
    setScrollProgress(Math.min(Math.max(progress, 0), 1));
  }, []);

  useEffect(() => {
    updateScrollPosition();
    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    window.addEventListener('resize', updateScrollPosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
      window.removeEventListener('resize', updateScrollPosition);
    };
  }, [updateScrollPosition]);

  return {
    ref,
    isVisible,
    hasTriggered,
    scrollY,
    scrollProgress,
  };
};

// Hook for smooth scrolling to elements
export const useSmoothScroll = () => {
  const scrollToElement = useCallback((
    elementId: string,
    options: ScrollIntoViewOptions = {}
  ) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        ...options,
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return {
    scrollToElement,
    scrollToTop,
  };
};

// Hook for tracking current section
export const useCurrentSection = (sectionIds: string[]) => {
  const [currentSection, setCurrentSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-20% 0px -70% 0px',
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return currentSection;
};