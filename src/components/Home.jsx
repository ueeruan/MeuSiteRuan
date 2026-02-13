import { motion } from 'framer-motion';
import Hero from './Hero';
import About from './About';
import Portfolio from './Portfolio';
import Footer from './Footer';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <Hero />
            <About />
            <Portfolio />
            <Footer />
        </motion.div>
    );
};

export default Home;
