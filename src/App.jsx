import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import Feedback from './components/Feedback';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Lenis from 'lenis';

import DownloadsPage from './components/DownloadsPage';
import FloatingChat from './components/FloatingChat';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/servicos" element={<ServicesPage />} />
        <Route path="/downloads" element={<DownloadsPage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="bg-brand-dark min-h-screen text-white relative font-sans">
        <Background />
        <Navbar />
        <FloatingChat />
        <main>
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
