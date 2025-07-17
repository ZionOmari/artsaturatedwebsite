export const measurePerformance = () => {
  // Web Vitals measurement
  if ('performance' in window) {
    // Measure First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log(`Performance metric: ${entry.name}`, entry);
      });
    });

    observer.observe({ entryTypes: ['paint', 'navigation', 'measure'] });

    // Measure custom metrics
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`Page load time: ${loadTime}ms`);
    });
  }
};

export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};