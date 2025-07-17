import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { VisualTheme, VisualMode, GrayscaleIntensity } from '../types';

// Default theme configuration
const DEFAULT_THEME: VisualTheme = {
  mode: 'color',
  intensity: 0,
  contrast: 1,
  brightness: 1,
  animationDuration: 300,
};

// Action types for theme reducer
type ThemeAction =
  | { type: 'SET_MODE'; payload: VisualMode }
  | { type: 'SET_INTENSITY'; payload: GrayscaleIntensity }
  | { type: 'SET_CONTRAST'; payload: number }
  | { type: 'SET_BRIGHTNESS'; payload: number }
  | { type: 'SET_ANIMATION_DURATION'; payload: number }
  | { type: 'UPDATE_THEME'; payload: Partial<VisualTheme> }
  | { type: 'RESET_THEME' }
  | { type: 'LOAD_SAVED_THEME'; payload: VisualTheme };

// Theme reducer
function themeReducer(state: VisualTheme, action: ThemeAction): VisualTheme {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    case 'SET_INTENSITY':
      return { ...state, intensity: action.payload };
    case 'SET_CONTRAST':
      return { ...state, contrast: action.payload };
    case 'SET_BRIGHTNESS':
      return { ...state, brightness: action.payload };
    case 'SET_ANIMATION_DURATION':
      return { ...state, animationDuration: action.payload };
    case 'UPDATE_THEME':
      return { ...state, ...action.payload };
    case 'RESET_THEME':
      return DEFAULT_THEME;
    case 'LOAD_SAVED_THEME':
      return action.payload;
    default:
      return state;
  }
}

// Context type definition
interface VisualThemeContextType {
  theme: VisualTheme;
  setMode: (mode: VisualMode) => void;
  setIntensity: (intensity: GrayscaleIntensity) => void;
  setContrast: (contrast: number) => void;
  setBrightness: (brightness: number) => void;
  setAnimationDuration: (duration: number) => void;
  updateTheme: (updates: Partial<VisualTheme>) => void;
  resetTheme: () => void;
  toggleGrayscale: () => void;
  isGrayscaleMode: boolean;
  getFilterString: () => string;
  saveTheme: () => void;
  loadTheme: () => void;
}

// Create context
const VisualThemeContext = createContext<VisualThemeContextType | undefined>(undefined);

// Hook for using the context
export const useVisualTheme = (): VisualThemeContextType => {
  const context = useContext(VisualThemeContext);
  if (!context) {
    throw new Error('useVisualTheme must be used within a VisualThemeProvider');
  }
  return context;
};

// Local storage key
const THEME_STORAGE_KEY = 'art-saturated-visual-theme';

// Provider component
interface VisualThemeProviderProps {
  children: ReactNode;
  autoSave?: boolean;
}

export const VisualThemeProvider: React.FC<VisualThemeProviderProps> = ({ 
  children, 
  autoSave = true 
}) => {
  const [theme, dispatch] = useReducer(themeReducer, DEFAULT_THEME);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        dispatch({ type: 'LOAD_SAVED_THEME', payload: parsedTheme });
      } catch (error) {
        console.warn('Failed to load saved theme:', error);
      }
    }
  }, []);

  // Auto-save theme when it changes
  useEffect(() => {
    if (autoSave) {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    }
  }, [theme, autoSave]);

  // Apply CSS custom properties when theme changes
  useEffect(() => {
    const root = document.documentElement;
    const filterString = getFilterString();
    
    root.style.setProperty('--visual-filter', filterString);
    root.style.setProperty('--animation-duration', `${theme.animationDuration}ms`);
    root.style.setProperty('--theme-mode', theme.mode);
    
    // Add/remove body classes for theme-specific styling
    document.body.classList.remove('theme-color', 'theme-grayscale', 'theme-sepia', 'theme-blue-filter');
    document.body.classList.add(`theme-${theme.mode}`);
  }, [theme]);

  // Context methods
  const setMode = (mode: VisualMode) => {
    dispatch({ type: 'SET_MODE', payload: mode });
  };

  const setIntensity = (intensity: GrayscaleIntensity) => {
    dispatch({ type: 'SET_INTENSITY', payload: intensity });
  };

  const setContrast = (contrast: number) => {
    dispatch({ type: 'SET_CONTRAST', payload: contrast });
  };

  const setBrightness = (brightness: number) => {
    dispatch({ type: 'SET_BRIGHTNESS', payload: brightness });
  };

  const setAnimationDuration = (duration: number) => {
    dispatch({ type: 'SET_ANIMATION_DURATION', payload: duration });
  };

  const updateTheme = (updates: Partial<VisualTheme>) => {
    dispatch({ type: 'UPDATE_THEME', payload: updates });
  };

  const resetTheme = () => {
    dispatch({ type: 'RESET_THEME' });
  };

  const toggleGrayscale = () => {
    const newMode = theme.mode === 'grayscale' ? 'color' : 'grayscale';
    setMode(newMode);
  };

  const isGrayscaleMode = theme.mode !== 'color';

  const getFilterString = (): string => {
    const filters: string[] = [];

    switch (theme.mode) {
      case 'grayscale':
        filters.push(`grayscale(${theme.intensity}%)`);
        break;
      case 'sepia':
        filters.push(`sepia(${theme.intensity}%)`);
        break;
      case 'blue-filter':
        filters.push(`hue-rotate(240deg) saturate(${100 - theme.intensity}%)`);
        break;
      default:
        // Color mode - no filter
        break;
    }

    if (theme.contrast !== 1) {
      filters.push(`contrast(${theme.contrast})`);
    }

    if (theme.brightness !== 1) {
      filters.push(`brightness(${theme.brightness})`);
    }

    return filters.length > 0 ? filters.join(' ') : 'none';
  };

  const saveTheme = () => {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  };

  const loadTheme = () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        dispatch({ type: 'LOAD_SAVED_THEME', payload: parsedTheme });
      } catch (error) {
        console.error('Failed to load saved theme:', error);
      }
    }
  };

  const contextValue: VisualThemeContextType = {
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
    getFilterString,
    saveTheme,
    loadTheme,
  };

  return (
    <VisualThemeContext.Provider value={contextValue}>
      {children}
    </VisualThemeContext.Provider>
  );
};