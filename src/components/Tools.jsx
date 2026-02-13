import RevealOnScroll from './RevealOnScroll';
import { motion } from 'framer-motion';
import { Download, Package, Zap } from 'lucide-react';

const toolsData = [
    {
        id: 1,
        title: "MultiTools v0.1",
        description: "Potencialize seu workflow no After Effects e Premiere Pro com esta extensão exclusiva. Automação, presets e utilitários em um só lugar.",
        icon: Package,
        link: "https://drive.google.com/file/d/1Yd_RFTDwyhMnzIkIdDkmu2z662ntfjC_/view?usp=drive_link",
        tags: ["Beta", "v0.1"],
        color: "brand-accent"
    },
    {
        id: 2,
        title: "Extension 999+",
        description: "A extensão definitiva para After Effects. Baixe vídeos do YouTube, gere legendas automáticas e organize seus packs em um só lugar.",
        icon: Zap,
        link: "https://drive.google.com/file/d/1V7ZDRCjaA4okTX3Qu10ZILNF697ldXk0/view?usp=sharing",
        tags: ["Extension", "YT Downloader", "Free"],
        password: "Senha: Sw2kkj",
        color: "brand-red-dark"
    }
];

const Tools = () => {
    return (
        <section className="py-24 bg-brand-dark/50 relative overflow-hidden" id="tools">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <RevealOnScroll>
                    <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tighter">
                        Ferramentas & <span className="text-brand-accent italic">Recursos</span>
                    </h2>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {toolsData.map((tool, index) => (
                        <RevealOnScroll key={tool.id} delay={index * 0.2}>
                            <div
                                className="glass-panel rounded-3xl p-10 flex flex-col h-full group transition-all duration-500 hover:border-brand-accent/30 translate-y-0 hover:-translate-y-2"
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-brand-accent/10 border border-brand-accent/20 group-hover:bg-brand-accent/20 transition-colors`}>
                                        <tool.icon size={32} className="text-brand-accent" />
                                    </div>
                                    <div className="flex gap-2">
                                        {tool.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white/5 text-white/40 text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-accent transition-colors">{tool.title}</h3>
                                <p className="text-red-100/40 leading-relaxed mb-8 flex-grow font-light">
                                    {tool.description}
                                </p>

                                {tool.password && (
                                    <div className="mb-8 p-4 bg-brand-accent/5 border border-brand-accent/20 rounded-2xl text-center">
                                        <p className="text-brand-accent font-mono text-sm tracking-[0.2em]">{tool.password}</p>
                                    </div>
                                )}

                                <div className="mt-auto pt-4">
                                    <motion.a
                                        href={tool.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all bg-gradient-to-r from-brand-accent to-brand-red-dark text-white shadow-xl shadow-brand-accent/10 hover:shadow-brand-accent/20 border border-brand-accent/20"
                                    >
                                        <Download size={22} />
                                        <span>Baixar Agora</span>
                                    </motion.a>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tools;
