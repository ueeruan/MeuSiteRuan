import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Portfolio from './Portfolio';
import Tools from './Tools';
import Pricing from './Pricing';
import Contact from './Contact';
import Footer from './Footer';
import Background from './Background';
import LoadingScreen from './LoadingScreen';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-brand-dark min-h-screen text-white relative font-sans">
            <AnimatePresence>
                {isLoading && <LoadingScreen />}
            </AnimatePresence>

            <Background />
            <Navbar />
            <main>
                <Hero />
                <About />
                <Portfolio />
                <Tools />
                <Pricing />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
