import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import { CartProvider } from './contexts/CartContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Connect from './components/Connect';
import Merch from './components/Merch';

// Main Home Page with all sections
const Home: React.FC = () => {
  return (
    <div className="iridescent-bg min-h-screen w-full">
      <Navigation />
      <Hero />
      <About />
      <Gallery />
      <Connect />
    </div>
  );
};

// Shop Page
const Shop: React.FC = () => {
  return (
    <div className="iridescent-bg min-h-screen w-full">
      <Navigation />
      <div className="pt-16"> {/* Add padding for navigation */}
        <Merch />
      </div>
    </div>
  );
};

// --- Main App ---
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </Router>
      </CartProvider>
    </ErrorBoundary>
  );
};

export default App; 