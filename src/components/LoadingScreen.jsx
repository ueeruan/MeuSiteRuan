import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[200] bg-brand-dark flex flex-col items-center justify-center"
        >
            <div className="relative overflow-hidden px-8 py-4">
                <motion.h1
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    className="text-4xl md:text-6xl font-heading tracking-widest text-white mb-2"
                >
                    RUANZI<span className="text-brand-accent">TWO</span>
                </motion.h1>
                <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent/20"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 text-xs font-sans tracking-[0.5em] text-white/20 uppercase"
            >
                Iniciando Experiência
            </motion.div>
        </motion.div>
    );
};

export default LoadingScreen;
