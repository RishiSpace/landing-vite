import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Contact from './components/Contact';

function App() {
  return (
    <div className="app">
      <Hero />
      <About />
      <Education />
      <Contact />
    </div>
  );
}

export default App;