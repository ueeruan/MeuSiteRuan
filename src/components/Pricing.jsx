import RevealOnScroll from './RevealOnScroll';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const Pricing = () => {
    return (
        <section className="py-32 bg-transparent relative" id="pricing">
            <div className="container mx-auto px-4 relative z-10">
                <RevealOnScroll>
                    <div className="max-w-4xl mx-auto glass-panel rounded-[3.5rem] p-0.5 relative group overflow-hidden border-brand-accent/20">
                        {/* Animated Border/Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 via-transparent to-brand-accent/5 opacity-50" />

                        <div className="bg-brand-surface/90 backdrop-blur-3xl rounded-[3.4rem] p-12 md:p-20 text-center relative overflow-hidden">
                            {/* Decorative Background Symbol */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-3 px-6 py-3 bg-brand-accent/10 text-brand-accent rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-12 border border-brand-accent/20"
                            >
                                <Sparkles size={14} />
                                Promoção de Lançamento
                            </motion.div>

                            <h2 className="text-5xl md:text-8xl font-heading mb-8 tracking-tighter leading-none">
                                EDIÇÃO <span className="text-brand-accent">PREMIUM</span>
                            </h2>

                            <p className="text-slate-400 text-lg mb-16 max-w-xl mx-auto font-light leading-relaxed">
                                Transforme seu conteúdo bruto em uma obra-prima de alta performance. Otimizado para retenção e impacto visual.
                            </p>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-16">
                                <div className="text-center md:text-right">
                                    <span className="text-white/20 text-xl font-light line-through block">R$ 150</span>
                                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Preço Original</span>
                                </div>

                                <div className="h-px w-12 bg-white/10 hidden md:block" />

                                <div className="flex items-center gap-2">
                                    <span className="text-brand-accent font-heading text-3xl self-start mt-2">R$</span>
                                    <span className="text-8xl md:text-9xl font-heading text-white tracking-tighter">70</span>
                                    <span className="text-white/40 font-heading text-2xl self-end mb-4">,00</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto mb-20 border-t border-white/5 pt-16">
                                {[
                                    "Vídeos de até 2 minutos",
                                    "Color Grading Profissional",
                                    "Legendas Estilizadas V2",
                                    "Sound Design Imersivo",
                                    "Mixagem de Áudio Master",
                                    "Exportação em 4K HDR"
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-5 group/item">
                                        <div className="w-6 h-6 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent border border-brand-accent/20 group-hover/item:bg-brand-accent group-hover:text-brand-dark transition-all duration-300">
                                            <Check size={14} />
                                        </div>
                                        <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <motion.a
                                href="https://wa.me/5588996126717?text=Opa,%20tenho%20interesse%20na%20promoção%20de%20edição%20por%2070%20reais!"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center justify-center gap-4 w-full md:w-auto px-16 py-8 bg-brand-accent text-brand-dark font-heading text-xl rounded-3xl shadow-2xl shadow-brand-accent/20 hover:shadow-brand-accent/40 transition-all"
                            >
                                <span>RESERVAR VAGA</span>
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <Sparkles size={24} />
                                </motion.div>
                            </motion.a>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Pricing;
