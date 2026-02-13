import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Portfolio from './Portfolio';
import Tools from './Tools';
import Pricing from './Pricing';
import Contact from './Contact';
import Footer from './Footer';
import Background from './Background';

const Home = () => {
    return (
        <div className="bg-brand-dark min-h-screen text-white relative">
            <Background />
            <Navbar />
            <Hero />
            <About />
            <Portfolio />
            <Tools />
            <Pricing />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;
