import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import About from './About';

import Footer from './Footer';

// Global flag to track if sound has played in this session (reset on reload)
let welcomeSoundPlayed = false;

const Home = () => {
    useEffect(() => {
        if (!welcomeSoundPlayed) {
            const audio = new Audio('/sounds/welcome.mp3');
            audio.volume = 0.5;
            audio.play().catch(e => console.log("Audio play failed (user interaction needed or file missing)", e));
            welcomeSoundPlayed = true;
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <Hero />
            <About />
            {/* Portfolio CTA */}
            <section className="py-20 bg-transparent relative overflow-hidden">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto glass-panel p-12 rounded-[3rem] border-brand-accent/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block relative z-10">
                            Meus Projetos
                        </span>

                        <h2 className="text-4xl md:text-6xl font-heading mb-8 tracking-tighter relative z-10">
                            EXPLORE O <span className="text-brand-accent">PORTFOLIO</span>
                        </h2>

                        <p className="text-white/60 mb-10 max-w-2xl mx-auto font-light leading-relaxed relative z-10">
                            Veja como transformo ideias brutas em narrativas visuais impactantes.
                        </p>

                        <a
                            href="#/portfolio"
                            className="relative z-10 inline-flex items-center gap-4 px-10 py-5 bg-brand-accent text-brand-dark font-heading text-lg rounded-2xl hover:shadow-xl hover:shadow-brand-accent/20 transition-all hover:-translate-y-1"
                        >
                            <span>VER TODOS OS TRABALHOS</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </a>
                    </div>
                </div>
            </section>
            <Footer />
        </motion.div>
    );
};

export default Home;
