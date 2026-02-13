import RevealOnScroll from './RevealOnScroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const PROMOTIONS = [
    {
        id: 'mensal',
        title: 'PROMO MENSAL',
        badge: '🔥 OFERTA IMPERDÍVEL 🔥',
        description: 'A solução definitiva. 2 vídeos por dia, todos os dias, por um mês inteiro.',
        originalPrice: '3.000',
        price: '1.500',
        features: [
            "2 Vídeos/dia (Seg-Sex)",
            "Duração até 3 min",
            "Edição Completa (Cortes/Legendas)",
            "Sound Design & Mix",
            "Thumbnails Inclusas",
            "Prioridade Total na Fila"
        ],
        whatsapp: "Opa! Quero a PROMO MENSAL de R$ 1.500 agora!"
    },
    {
        id: 'premium',
        title: 'EDIÇÃO PREMIUM',
        badge: 'Promoção de Lançamento',
        description: 'Transforme seu conteúdo bruto em uma obra-prima de alta performance.',
        originalPrice: '150',
        price: '70',
        features: [
            "Vídeos de até 2 minutos",
            "Color Grading Profissional",
            "Legendas Estilizadas V2",
            "Sound Design Imersivo",
            "Mixagem de Áudio Master",
            "Exportação em 4K HDR"
        ],
        whatsapp: "Opa, tenho interesse na promoção de edição por 70 reais!"
    },
    {
        id: 'pack5',
        title: 'PACK 5 VÍDEOS',
        badge: 'Meio Termo Ideal',
        description: 'O equilíbrio perfeito. Teste nossa qualidade com um pacote intermediário.',
        originalPrice: '750',
        price: '500',
        features: [
            "5 Vídeos de até 2 min",
            "Color Grading Profissional",
            "Legendas Estilizadas V2",
            "Sound Design Imersivo",
            "Mixagem de Áudio Master",
            "Exportação em 4K HDR"
        ],
        whatsapp: "Opa, quero reservar o pack de 5 vídeos por 500 reais!"
    },
    {
        id: 'combo',
        title: 'COMBO 10 VÍDEOS',
        badge: 'Melhor Custo-Benefício',
        description: 'Frequência e economia. Ideal para canais e redes sociais.',
        originalPrice: '1.500',
        price: '750',
        features: [
            "10 Vídeos de até 2 min",
            "Prioridade na Entrega",
            "Estilo Visual Consistente",
            "Sound Design Completo",
            "Mixagem de Áudio Master",
            "Backup por 6 Meses"
        ],
        whatsapp: "Opa, quero reservar o combo de 10 vídeos por 750 reais!"
    }
];

const Pricing = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % PROMOTIONS.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + PROMOTIONS.length) % PROMOTIONS.length);
    };

    const promo = PROMOTIONS[currentIndex];

    const variants = {
        enter: (dir) => ({
            x: dir > 0 ? 50 : -50,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            zIndex: 1
        },
        exit: (dir) => ({
            x: dir < 0 ? 50 : -50,
            opacity: 0,
            scale: 0.95,
            zIndex: 0
        })
    };

    return (
        <section className="py-12 bg-transparent relative" id="pricing">
            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
                <RevealOnScroll>
                    <div className="max-w-lg mx-auto relative group">
                        {/* Navigation Arrows */}
                        <div className="absolute inset-y-0 -left-12 -right-12 hidden md:flex items-center justify-between pointer-events-none z-20">
                            <motion.button
                                whileHover={{ scale: 1.1, x: -3 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={prevSlide}
                                className="pointer-events-auto w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white/40 hover:text-brand-accent hover:border-brand-accent/50 transition-all shadow-xl emerald-glow"
                            >
                                <ChevronLeft size={18} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1, x: 3 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={nextSlide}
                                className="pointer-events-auto w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white/40 hover:text-brand-accent hover:border-brand-accent/50 transition-all shadow-xl emerald-glow"
                            >
                                <ChevronRight size={18} />
                            </motion.button>
                        </div>

                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 400, damping: 35 },
                                    opacity: { duration: 0.2 },
                                    scale: { duration: 0.2 }
                                }}
                                className={`rounded-[2rem] p-[2px] relative overflow-hidden transition-all duration-300 ${promo.id === 'mensal' ? 'shadow-2xl shadow-blue-500/20' : 'glass-panel border-brand-accent/20 shadow-emerald-glow'}`}
                            >
                                {/* Animated Border Glow for Promo Mensal */}
                                {promo.id === 'mensal' && (
                                    <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,#ff4545,#00ff99,#006aff,#ff0095,#ff4545)] opacity-100" />
                                )}

                                <div className="bg-[#0d121f] rounded-[1.9rem] p-8 md:p-10 text-center relative overflow-hidden h-full">

                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent/5 rounded-full blur-[60px] pointer-events-none z-10" />

                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/10 text-brand-accent rounded-full text-[8px] font-black uppercase tracking-[0.3em] mb-6 border border-brand-accent/20">
                                        <Sparkles size={10} />
                                        {promo.badge}
                                    </div>

                                    <h2 className="text-2xl md:text-3xl font-heading mb-4 tracking-tighter leading-none">
                                        {promo.title.split(' ')[0]} <span className="text-brand-accent">{promo.title.split(' ').slice(1).join(' ')}</span>
                                    </h2>

                                    <p className="text-white/40 text-[11px] mb-8 max-w-[240px] mx-auto font-medium leading-relaxed">
                                        {promo.description}
                                    </p>

                                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-8">
                                        <div className="text-center md:text-right">
                                            <span className="text-white/20 text-base font-light line-through block">R$ {promo.originalPrice}</span>
                                            <span className="text-white/40 text-[8px] font-bold uppercase tracking-widest">Original</span>
                                        </div>
                                        <div className="h-px w-6 bg-white/10 hidden md:block" />
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-brand-accent font-heading text-lg self-start mt-1">R$</span>
                                            <span className="text-5xl md:text-6xl font-heading text-white tracking-tighter">{promo.price}</span>
                                            <span className="text-white/40 font-heading text-base self-end mb-3">,00</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3.5 text-left max-w-[240px] mx-auto mb-10 border-t border-white/5 pt-8">
                                        {promo.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3 group/item">
                                                <div className="w-4 h-4 rounded-md bg-brand-accent/10 flex items-center justify-center text-brand-accent border border-brand-accent/20 group-hover/item:bg-brand-accent group-hover:text-brand-dark transition-all duration-300">
                                                    <Check size={10} />
                                                </div>
                                                <span className="text-white/60 text-[8px] font-bold uppercase tracking-widest">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <motion.a
                                        href={`https://wa.me/5588996126717?text=${encodeURIComponent(promo.whatsapp)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02, y: -3 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="inline-flex items-center justify-center gap-3 w-full px-8 py-3.5 bg-brand-accent text-brand-dark font-heading text-[11px] rounded-xl shadow-xl shadow-brand-accent/10 hover:shadow-brand-accent/30 transition-all font-black uppercase tracking-widest"
                                    >
                                        <span>RESERVAR VAGA</span>
                                        <Sparkles size={14} className="animate-pulse" />
                                    </motion.a>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Pagination Dots */}
                        <div className="flex justify-center gap-2 mt-6">
                            {PROMOTIONS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setDirection(i > currentIndex ? 1 : -1);
                                        setCurrentIndex(i);
                                    }}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-brand-accent w-5' : 'bg-white/10 hover:bg-white/20'}`}
                                />
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Pricing;
