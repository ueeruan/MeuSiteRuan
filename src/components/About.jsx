import { motion } from 'framer-motion';

const About = () => {
    return (
        <section className="py-20 text-white relative" id="about">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-brand-blue/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-brand-blue/20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                        Sobre O Editor
                    </h2>

                    <div className="space-y-6 text-lg text-blue-100/90 leading-relaxed text-center">
                        <p>
                            Com <span className="font-bold text-white px-2 py-1 bg-brand-blue/30 rounded">4 anos de experiência</span> no mercado, transformo ideias brutas em narrativas visuais impactantes.
                        </p>
                        <p>
                            Especialista em criar ritmos dinâmicos e estéticas memoráveis, meu foco é elevar a qualidade do seu conteúdo através de uma edição precisa e criativa.
                        </p>
                    </div>

                    <div className="mt-12">
                        <h3 className="text-xl font-semibold mb-6 text-center text-brand-accent">Ferramentas Principais</h3>
                        <div className="flex flex-wrap justify-center gap-6">
                            {/* Skill Badge: After Effects */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex flex-col items-center gap-2 p-4 bg-black/40 rounded-xl border border-purple-500/30 w-32 md:w-40"
                            >
                                <div className="text-purple-400 font-bold text-2xl">Ae</div>
                                <span className="text-sm font-medium">After Effects</span>
                            </motion.div>

                            {/* Skill Badge: Premiere Pro */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex flex-col items-center gap-2 p-4 bg-black/40 rounded-xl border border-indigo-500/30 w-32 md:w-40"
                            >
                                <div className="text-indigo-400 font-bold text-2xl">Pr</div>
                                <span className="text-sm font-medium">Premiere Pro</span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
