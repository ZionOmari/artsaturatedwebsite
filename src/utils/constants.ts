import { NavigationItem, SocialLink, ArtworkItem, Product } from '../types';

// Animation configurations
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 1000,
} as const;

export const EASING_CURVES = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// Navigation items
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'merchandise', label: 'Merchandise', href: '#merchandise' },
  { id: 'connect', label: 'Connect', href: '#connect' },
];

// Social media links
export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'Instagram',
    url: 'https://instagram.com/artsaturated',
    icon: '📷',
    color: 'from-pink-500 to-orange-500',
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/artsaturated',
    icon: '🐦',
    color: 'from-blue-400 to-blue-600',
  },
  {
    platform: 'Facebook',
    url: 'https://facebook.com/artsaturated',
    icon: '📘',
    color: 'from-blue-600 to-blue-800',
  },
  {
    platform: 'YouTube',
    url: 'https://youtube.com/artsaturated',
    icon: '📺',
    color: 'from-red-500 to-red-700',
  },
  {
    platform: 'Pinterest',
    url: 'https://pinterest.com/artsaturated',
    icon: '📌',
    color: 'from-red-600 to-pink-600',
  },
  {
    platform: 'Behance',
    url: 'https://behance.net/artsaturated',
    icon: '🎨',
    color: 'from-blue-500 to-purple-600',
  },
];

// Sample artwork data
export const SAMPLE_ARTWORKS: ArtworkItem[] = [
  {
    id: '1',
    title: 'Monochrome Dreams',
    description: 'A stunning exploration of light and shadow in grayscale medium',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    artist: 'Alex Rivera',
    category: 'Digital Art',
    tags: ['abstract', 'monochrome', 'digital'],
    featured: true,
    dimensions: { width: 1920, height: 1080 },
    dateCreated: '2024-01-15',
  },
  {
    id: '2',
    title: 'Color Transition',
    description: 'The journey from grayscale to vibrant color representation',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
    artist: 'Sarah Chen',
    category: 'Mixed Media',
    tags: ['transition', 'color theory', 'experimental'],
    featured: true,
    dimensions: { width: 1600, height: 1200 },
    dateCreated: '2024-01-20',
  },
  {
    id: '3',
    title: 'Urban Shadows',
    description: 'Street photography capturing the essence of city life in grayscale',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
    artist: 'Marcus Thompson',
    category: 'Photography',
    tags: ['street', 'urban', 'black and white'],
    featured: false,
    dimensions: { width: 1920, height: 1280 },
    dateCreated: '2024-01-25',
  },
  {
    id: '4',
    title: 'Nature\'s Palette',
    description: 'Exploring natural forms through the lens of selective color',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    artist: 'Emily Watson',
    category: 'Photography',
    tags: ['nature', 'landscape', 'color selective'],
    featured: true,
    dimensions: { width: 2048, height: 1365 },
    dateCreated: '2024-02-01',
  },
  {
    id: '5',
    title: 'Abstract Geometry',
    description: 'Geometric patterns exploring the relationship between form and color',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    artist: 'David Kim',
    category: 'Digital Art',
    tags: ['geometric', 'abstract', 'pattern'],
    featured: false,
    dimensions: { width: 1080, height: 1080 },
    dateCreated: '2024-02-05',
  },
  {
    id: '6',
    title: 'Emotional Spectrum',
    description: 'A visual representation of emotions through color and texture',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    artist: 'Lisa Rodriguez',
    category: 'Painting',
    tags: ['emotion', 'texture', 'expressive'],
    featured: true,
    dimensions: { width: 1200, height: 1600 },
    dateCreated: '2024-02-10',
  },
];

// Sample merchandise data
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Grayscale Collection T-Shirt',
    description: 'Premium cotton t-shirt featuring exclusive grayscale artwork',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    ],
    category: 'Apparel',
    inStock: true,
    featured: true,
    tags: ['t-shirt', 'cotton', 'grayscale', 'exclusive'],
  },
  {
    id: 'prod-2',
    name: 'Art Saturated Print Set',
    description: 'High-quality art prints showcasing our featured collection',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800',
    images: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800',
    ],
    category: 'Prints',
    inStock: true,
    featured: true,
    tags: ['prints', 'art', 'collection', 'wall art'],
  },
  {
    id: 'prod-3',
    name: 'Creative Process Mug',
    description: 'Ceramic mug with color-changing design that reveals artwork when hot',
    price: 16.99,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
    ],
    category: 'Accessories',
    inStock: true,
    featured: false,
    tags: ['mug', 'ceramic', 'color-changing', 'interactive'],
  },
  {
    id: 'prod-4',
    name: 'Art Technique Book',
    description: 'Comprehensive guide to grayscale and color transition techniques',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
    images: [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
    ],
    category: 'Books',
    inStock: true,
    featured: true,
    tags: ['book', 'education', 'techniques', 'reference'],
  },
  {
    id: 'prod-5',
    name: 'Sketching Kit',
    description: 'Professional sketching kit with grayscale pencils and blending tools',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800',
    images: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800',
    ],
    category: 'Art Supplies',
    inStock: false,
    featured: false,
    tags: ['sketching', 'pencils', 'art supplies', 'professional'],
  },
  {
    id: 'prod-6',
    name: 'Exclusive Tote Bag',
    description: 'Eco-friendly canvas tote bag with signature artwork design',
    price: 22.99,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    ],
    category: 'Accessories',
    inStock: true,
    featured: false,
    tags: ['tote bag', 'eco-friendly', 'canvas', 'signature'],
  },
];

// Theme presets
export const THEME_PRESETS = {
  classic: {
    mode: 'grayscale' as const,
    intensity: 100 as const,
    contrast: 1.1,
    brightness: 0.9,
    animationDuration: 300,
  },
  subtle: {
    mode: 'grayscale' as const,
    intensity: 50 as const,
    contrast: 1,
    brightness: 1,
    animationDuration: 300,
  },
  dramatic: {
    mode: 'grayscale' as const,
    intensity: 100 as const,
    contrast: 1.3,
    brightness: 0.8,
    animationDuration: 500,
  },
  sepia: {
    mode: 'sepia' as const,
    intensity: 75 as const,
    contrast: 1.1,
    brightness: 1.1,
    animationDuration: 300,
  },
  blue: {
    mode: 'blue-filter' as const,
    intensity: 60 as const,
    contrast: 1.2,
    brightness: 0.95,
    animationDuration: 400,
  },
  color: {
    mode: 'color' as const,
    intensity: 0 as const,
    contrast: 1,
    brightness: 1,
    animationDuration: 300,
  },
};

// Responsive breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Z-index layers
export const Z_INDEX = {
  base: 0,
  elevated: 10,
  overlay: 20,
  modal: 30,
  popover: 40,
  tooltip: 50,
  notification: 60,
} as const;