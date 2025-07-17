import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Merch from './components/Merch';
import Connect from './components/Connect';

function App() {
  const [grayscaleMode, setGrayscaleMode] = useState(false);

  const toggleGrayscaleMode = () => {
    setGrayscaleMode(!grayscaleMode);
  };

  return (
    <div className={`App ${grayscaleMode ? 'grayscale-active' : 'grayscale-inactive'} grayscale-toggle`}>
      <Navigation onGrayscaleToggle={toggleGrayscaleMode} grayscaleMode={grayscaleMode} />
      <Hero grayscaleMode={grayscaleMode} />
      <Gallery grayscaleMode={grayscaleMode} />
      <About grayscaleMode={grayscaleMode} />
      <Merch grayscaleMode={grayscaleMode} />
      <Connect grayscaleMode={grayscaleMode} />
    </div>
  );
}

export default App;