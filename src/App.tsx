import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';

// Pages
import Home from './pages/Home';
import ArtworkPage from './pages/ArtworkPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/artwork/:id" element={<ArtworkPage />} />
          </Routes>
        </AnimatePresence>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
