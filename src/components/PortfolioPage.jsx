import { motion } from 'framer-motion';
import Portfolio from './Portfolio';
import Footer from './Footer';
import RevealOnScroll from './RevealOnScroll';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PortfolioPage = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-24 min-h-screen flex flex-col"
        >
            <div className="flex-grow">
                <Portfolio />

                <RevealOnScroll>
                    <div className="container mx-auto px-4 pb-20 text-center">
                        <div className="max-w-3xl mx-auto glass-panel p-10 rounded-[2rem] border-brand-accent/10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <h3 className="text-2xl md:text-3xl font-heading mb-6 tracking-tight relative z-10">
                                GOSTOU DO QUE VIU?
                            </h3>
                            <p className="text-white/60 mb-8 relative z-10">
                                Confira nossos pacotes e descubra como podemos elevar o nível do seu conteúdo.
                            </p>

                            <button
                                onClick={() => navigate('/servicos')}
                                className="relative z-10 inline-flex items-center gap-3 px-8 py-4 bg-brand-accent text-brand-dark font-heading text-sm rounded-xl hover:shadow-lg hover:shadow-brand-accent/20 transition-all group-hover:scale-105"
                            >
                                <span>VER PLANOS & PREÇOS</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
            <Footer />
        </motion.div>
    );
};

export default PortfolioPage;
