import RevealOnScroll from './RevealOnScroll';
import { motion } from 'framer-motion';
import { Download, Package, Zap, Disc, Mic } from 'lucide-react';

const pluginsData = [
    {
        id: 1,
        title: "MultiTools v0.1",
        description: "Potencialize seu workflow no After Effects e Premiere Pro com esta extensão exclusiva. Automação, presets e utilitários em um só lugar.",
        icon: Package,
        link: "https://drive.google.com/file/d/1Yd_RFTDwyhMnzIkIdDkmu2z662ntfjC_/view?usp=drive_link",
        tags: ["Beta", "v0.1"],
        category: "Productivity"
    }
];

const softwareData = [];

const Tools = () => {
    return (
        <section className="py-32 bg-transparent relative" id="tools">
            <div className="container mx-auto px-4 relative z-10">
                <RevealOnScroll>
                    <div className="flex flex-col items-center mb-20 text-center">
                        <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Recursos</span>
                        <h2 className="text-5xl md:text-7xl font-heading tracking-tighter">
                            FERRAMENTAS <span className="text-brand-accent">& EXTRAS</span>
                        </h2>
                    </div>
                </RevealOnScroll>

                {/* --- PLUGINS SECTION --- */}
                <div className="mb-24">
                    <RevealOnScroll>
                        <h3 className="text-2xl font-heading tracking-widest text-white/50 mb-10 border-b border-white/10 pb-4">
                            <span className="text-brand-accent">01.</span> PLUGINS & EXTENSIONS
                        </h3>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {pluginsData.map((tool, index) => (
                            <RevealOnScroll key={tool.id} delay={index * 0.2}>
                                <div className="glass-panel rounded-[3rem] p-12 flex flex-col h-full group transition-all duration-700 hover:border-brand-accent/30">
                                    <div className="flex items-start justify-between mb-10">
                                        <div className="w-20 h-20 rounded-3xl flex items-center justify-center bg-brand-accent/5 border border-brand-accent/10 group-hover:bg-brand-accent group-hover:text-brand-dark transition-all duration-500">
                                            <tool.icon size={36} />
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className="text-brand-accent text-[9px] font-black uppercase tracking-widest">{tool.category}</span>
                                            <div className="flex gap-2">
                                                {tool.tags.map(tag => (
                                                    <span key={tag} className="px-3 py-1 bg-white/5 text-white/40 text-[9px] font-bold uppercase tracking-widest rounded-full border border-white/5">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-heading mb-6 tracking-tighter group-hover:text-brand-accent transition-colors">{tool.title}</h3>
                                    <p className="text-slate-400 leading-relaxed mb-10 flex-grow font-light">
                                        {tool.description}
                                    </p>

                                    {tool.password && (
                                        <div className="mb-10 p-5 bg-brand-emerald-dark/10 border border-brand-accent/10 rounded-2xl text-center">
                                            <p className="text-brand-accent font-mono text-xs tracking-[0.2em]">{tool.password}</p>
                                        </div>
                                    )}

                                    <div className="mt-auto">
                                        <motion.a
                                            href={tool.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full font-heading py-6 px-8 rounded-2xl flex items-center justify-center gap-4 transition-all bg-white text-brand-dark hover:bg-brand-accent hover:shadow-xl hover:shadow-brand-accent/20 border border-transparent"
                                        >
                                            <Download size={24} />
                                            <span>DESCARREGAR</span>
                                        </motion.a>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>



                {/* --- CREDITS --- */}
                <RevealOnScroll>
                    <div className="text-center py-12 border-t border-white/5 flex flex-col items-center gap-4">
                        <p className="text-white/20 text-xs font-mono tracking-widest uppercase">
                            Credits to <span className="text-brand-accent font-bold">FaxyEmpire</span>
                        </p>
                        <a
                            href="https://discord.gg/faxyempire"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#5865F2]/10 text-[#5865F2] hover:bg-[#5865F2] hover:text-white transition-all text-xs font-bold tracking-widest uppercase"
                        >
                            <Disc size={14} />
                            <span>Join Discord</span>
                        </a>
                    </div>
                </RevealOnScroll>

            </div>
        </section>
    );
};

export default Tools;
