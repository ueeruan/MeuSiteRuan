import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

const WelcomePopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show after a short delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const closePopup = () => setIsVisible(false);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                        onClick={closePopup}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-brand-surface border border-brand-accent/30 p-8 rounded-3xl shadow-2xl shadow-brand-accent/20 max-w-sm w-full pointer-events-auto overflow-hidden group"
                    >
                        {/* Decorative background circle */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-accent/20 rounded-full blur-3xl group-hover:bg-brand-accent/30 transition-colors" />

                        <button
                            onClick={closePopup}
                            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative z-10 text-center">
                            <div className="w-16 h-16 bg-brand-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-brand-accent/30">
                                <Sparkles className="text-brand-accent" size={32} />
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-3">Site Atualizado!</h2>
                            <p className="text-blue-100/70 mb-8 leading-relaxed">
                                A nova versão do seu portfólio já está no ar com performance otimizada e novo design.
                            </p>

                            <button
                                onClick={closePopup}
                                className="w-full py-4 bg-brand-accent hover:bg-brand-blue text-white font-bold rounded-2xl transition-all shadow-lg shadow-brand-accent/20 active:scale-95"
                            >
                                Vamos lá!
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WelcomePopup;
