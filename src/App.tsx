import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import About from './pages/About';
import Analytics, { initializeGA } from './components/Analytics';

function App() {
  // Initialize Google Analytics on app load
  React.useEffect(() => {
    initializeGA();
  }, []);

  return (
    <Router>
      <Analytics />
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App; 