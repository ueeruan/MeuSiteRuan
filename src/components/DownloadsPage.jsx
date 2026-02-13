import { motion } from 'framer-motion';
import Footer from './Footer';
import Tools from './Tools';

const DownloadsPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-32 pb-12 min-h-screen flex flex-col"
        >
            <div className="container mx-auto px-6 flex-grow">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block"
                    >
                        Ferramentas & Assets
                    </motion.span>
                    <h2 className="text-5xl md:text-8xl font-heading tracking-tighter mb-8">
                        TURBINE SUAS <span className="text-brand-accent italic">EDIÇÕES</span>
                    </h2>
                    <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
                        Baixe meus presets e extensões exclusivas para elevar o nível das suas produções. Novos assets toda semana.
                    </p>
                </div>

                <Tools />
            </div>
            <Footer />
        </motion.div>
    );
};

export default DownloadsPage;
