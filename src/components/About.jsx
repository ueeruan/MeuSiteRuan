import RevealOnScroll from './RevealOnScroll';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section className="py-24 text-white relative bg-brand-dark" id="about">
            <div className="container mx-auto px-4 max-w-4xl">
                <RevealOnScroll>
                    <div className="bg-brand-red-dark/5 backdrop-blur-sm rounded-3xl p-8 md:p-16 border border-brand-accent/10 relative overflow-hidden group hover:border-brand-accent/30 transition-all duration-500">
                        {/* Interactive Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center tracking-tighter">
                            Sobre o <span className="text-brand-accent drop-shadow-[0_0_10px_rgba(220,20,60,0.3)]">Editor</span>
                        </h2>

                        <div className="space-y-8 text-lg text-red-100/70 leading-relaxed text-center font-light">
                            <p>
                                Com <span className="font-bold text-white px-3 py-1 bg-brand-accent/20 rounded-lg border border-brand-accent/30">4 anos de experiência</span>, transformo conteúdos brutos em narrativas visuais cinematográficas e dinâmicas.
                            </p>
                            <p className="max-w-2xl mx-auto">
                                Especialista em <span className="text-white font-medium italic">ritmos dinâmicos</span> e efeitos que prendem a atenção. Meu foco é elevar a qualidade do seu projeto através de uma estética moderna e profissional.
                            </p>
                        </div>

                        <div className="mt-16">
                            <h3 className="text-sm uppercase tracking-[0.4em] mb-10 text-center text-brand-accent/60 font-medium">Power Stacks</h3>
                            <div className="flex flex-wrap justify-center gap-8">
                                {/* Skill Badge: After Effects */}
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="flex flex-col items-center gap-3 p-6 bg-white/5 rounded-2xl border border-red-500/10 w-36 md:w-44 glass-panel hover:border-brand-accent/50 transition-colors"
                                >
                                    <div className="text-brand-accent font-black text-3xl">Ae</div>
                                    <span className="text-xs font-bold tracking-widest uppercase">After Effects</span>
                                </motion.div>

                                {/* Skill Badge: Premiere Pro */}
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="flex flex-col items-center gap-3 p-6 bg-white/5 rounded-2xl border border-red-500/10 w-36 md:w-44 glass-panel hover:border-brand-accent/50 transition-colors"
                                >
                                    <div className="text-red-500 font-black text-3xl">Pr</div>
                                    <span className="text-xs font-bold tracking-widest uppercase">Premiere Pro</span>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default About;
