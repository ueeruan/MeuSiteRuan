import RevealOnScroll from './RevealOnScroll';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section className="py-20 bg-transparent relative" id="about">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <RevealOnScroll>
                        <div className="relative">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '40px' }}
                                className="h-1 bg-brand-accent mb-6"
                            />
                            <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Processo Criativo</span>
                            <h2 className="text-4xl md:text-5xl font-heading mb-10 leading-[0.9] tracking-tighter">
                                DESIGN QUE <span className="text-brand-accent">PULSA</span> NO RITMO.
                            </h2>
                            <p className="text-slate-400 text-lg mb-10 font-light leading-relaxed max-w-xl">
                                Com foco em edições dinâmicas de alta performance, transformo horas de conteúdo bruto em peças de retenção absurda. Especialista em High-End Reels, TikTok e Edição Narrativa.
                            </p>

                            <div className="flex gap-4">
                                <div className="glass-panel p-6 rounded-[2rem] flex-1 border-brand-accent/10">
                                    <div className="text-white font-heading text-3xl mb-2">500<span className="text-brand-accent">+</span></div>
                                    <div className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-black">Vídeos Entregues</div>
                                </div>
                                <div className="glass-panel p-6 rounded-[2rem] flex-1 border-brand-accent/10">
                                    <div className="text-white font-heading text-3xl mb-2">100<span className="text-brand-accent">%</span></div>
                                    <div className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-black">Satisfação Total</div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.2}>
                        <div className="relative">
                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent/5 rounded-full blur-3xl" />

                            <div className="grid grid-cols-2 gap-6 relative z-10">
                                {/* Skill Cards */}
                                <motion.div
                                    whileHover={{ y: -10, rotate: -2 }}
                                    className="p-8 glass-panel rounded-[2rem] flex flex-col items-center justify-center gap-6 border-brand-accent/5"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent text-3xl font-heading">Ae</div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 text-center">After Effects</span>
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -10, rotate: 2 }}
                                    className="p-8 glass-panel rounded-[2rem] flex flex-col items-center justify-center gap-6 border-brand-accent/5 mt-8 md:mt-16"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white text-3xl font-heading">Pr</div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 text-center">Premiere Pro</span>
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -10, rotate: -2 }}
                                    className="p-8 glass-panel rounded-[2rem] flex flex-col items-center justify-center gap-6 border-brand-accent/5"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent text-3xl font-heading">Ps</div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 text-center">Photoshop</span>
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -10, rotate: 2 }}
                                    className="p-8 glass-panel rounded-[2rem] flex flex-col items-center justify-center gap-6 border-brand-accent/5 mt-8"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white text-3xl font-heading">Ai</div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 text-center">Illustrator</span>
                                </motion.div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};

export default About;
