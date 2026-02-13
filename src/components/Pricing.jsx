import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const Pricing = () => {
    return (
        <section className="py-20 bg-brand-dark text-white relative overflow-hidden" id="pricing">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-1 border border-white/20 shadow-2xl overflow-hidden"
                >
                    <div className="bg-black/40 backdrop-blur-xl rounded-[22px] p-8 md:p-12 text-center relative group">
                        {/* Animated Border Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none"></div>

                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/20 text-brand-accent rounded-full text-sm font-bold uppercase tracking-wider mb-6 border border-brand-accent/30">
                            <Sparkles size={16} />
                            Oferta Limitada
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Edição Premium</h2>
                        <p className="text-blue-200 text-lg mb-8 max-w-lg mx-auto">
                            Transforme seu conteúdo bruto em uma obra-prima visual. Ideal para Reels, TikTok ou YouTube Shorts.
                        </p>

                        <div className="flex items-center justify-center gap-2 mb-8">
                            <span className="text-2xl text-gray-400 line-through">R$ 150,00</span>
                            <span className="text-6xl font-bold text-white">R$ 70,00</span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-left max-w-lg mx-auto mb-10">
                            <div className="flex items-center gap-3">
                                <div className="p-1 bg-green-500/20 rounded-full text-green-400"><Check size={16} /></div>
                                <span className="text-gray-300">Vídeos de até 2 minutos</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-1 bg-green-500/20 rounded-full text-green-400"><Check size={16} /></div>
                                <span className="text-gray-300">Correção de Cor</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-1 bg-green-500/20 rounded-full text-green-400"><Check size={16} /></div>
                                <span className="text-gray-300">Legendas Dinâmicas</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-1 bg-green-500/20 rounded-full text-green-400"><Check size={16} /></div>
                                <span className="text-gray-300">Sound Design Imersivo</span>
                            </div>
                        </div>

                        <motion.a
                            href="https://wa.me/5588996126717?text=Opa,%20tenho%20interesse%20na%20promoção%20de%20edição%20por%2070%20reais!"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block w-full md:w-auto px-10 py-5 bg-white text-black font-bold text-xl rounded-xl shadow-lg shadow-white/10 hover:shadow-white/20 transition-all"
                        >
                            Quero Aproveitar
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;
