// Theme and Visual Mode Types
export type VisualMode = 'color' | 'grayscale' | 'sepia' | 'blue-filter';

export type GrayscaleIntensity = 0 | 25 | 50 | 75 | 100;

export interface VisualTheme {
  mode: VisualMode;
  intensity: GrayscaleIntensity;
  contrast: number;
  brightness: number;
  animationDuration: number;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface VisualModeProps extends BaseComponentProps {
  visualTheme: VisualTheme;
  onThemeChange?: (theme: Partial<VisualTheme>) => void;
}

// Image and Media Types
export interface ArtworkItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl?: string;
  artist: string;
  category: string;
  tags: string[];
  featured: boolean;
  dimensions?: {
    width: number;
    height: number;
  };
  dateCreated?: string;
}

export interface GalleryFilter {
  category?: string;
  artist?: string;
  tags?: string[];
  featured?: boolean;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  images: string[];
  category: string;
  inStock: boolean;
  featured: boolean;
  tags: string[];
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

// Contact and Social Types
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  color: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Animation and Transition Types
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface TransitionConfig {
  initial: object;
  animate: object;
  exit?: object;
  transition: AnimationConfig;
}

// State Management Types
export interface AppState {
  visualTheme: VisualTheme;
  currentSection: string;
  isLoading: boolean;
  error: string | null;
}

// Event Handler Types
export type ThemeChangeHandler = (theme: Partial<VisualTheme>) => void;
export type SectionChangeHandler = (sectionId: string) => void;
export type ImageLoadHandler = (imageId: string, loaded: boolean) => void;

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}