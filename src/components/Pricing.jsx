import RevealOnScroll from './RevealOnScroll';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const Pricing = () => {
    return (
        <section className="py-20 bg-brand-dark text-white relative overflow-hidden" id="pricing">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <RevealOnScroll>
                    <div className="max-w-3xl mx-auto bg-gradient-to-br from-brand-accent/20 to-transparent rounded-[32px] p-0.5 shadow-2xl overflow-hidden hover:border-brand-accent/30 transition-colors duration-500 border border-white/5">
                        <div className="bg-black/90 backdrop-blur-2xl rounded-[31px] p-8 md:p-16 text-center relative group">
                            {/* Animated Background Pulse */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-accent/10 rounded-full blur-[80px] animate-pulse"></div>

                            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-accent/10 text-brand-accent rounded-full text-xs font-black uppercase tracking-[0.2em] mb-10 border border-brand-accent/20">
                                <Sparkles size={16} />
                                Oferta Limitada
                            </div>

                            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">Edição <span className="text-brand-accent">Premium</span></h2>
                            <p className="text-red-100/40 text-lg mb-12 max-w-lg mx-auto font-light leading-relaxed">
                                Transforme seu conteúdo em uma obra-prima cinematográfica. Ideal para High-End Reels, TikTok e Shorts.
                            </p>

                            <div className="flex items-center justify-center gap-4 mb-12">
                                <span className="text-2xl text-white/20 line-through font-light">R$ 150</span>
                                <div className="flex items-start">
                                    <span className="text-2xl font-bold text-brand-accent mt-2">R$</span>
                                    <span className="text-7xl md:text-8xl font-black text-white tracking-tighter">70</span>
                                    <span className="text-2xl font-bold text-white/40 mt-auto mb-3">,00</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 text-left max-w-xl mx-auto mb-16">
                                {[
                                    "Vídeos de até 2 minutos",
                                    "Color Grading Avançado",
                                    "Legendas Dinâmicas v2",
                                    "Sound Design Imersivo",
                                    "Mixagem de Áudio Pro",
                                    "Exportação em 4K HDR"
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-4 group/item">
                                        <div className="p-1 bg-brand-accent/10 rounded-full text-brand-accent border border-brand-accent/20 group-hover/item:bg-brand-accent transition-colors">
                                            <Check size={14} />
                                        </div>
                                        <span className="text-white/60 text-sm font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <motion.a
                                href="https://wa.me/5588996126717?text=Opa,%20tenho%20interesse%20na%20promoção%20de%20edição%20por%2070%20reais!"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-12 py-6 bg-brand-accent text-white font-black text-xl rounded-2xl shadow-2xl shadow-brand-accent/30 hover:shadow-brand-accent/50 transition-all border border-white/10"
                            >
                                <span>RESERVAR VAGA</span>
                                <Sparkles size={20} />
                            </motion.a>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Pricing;
