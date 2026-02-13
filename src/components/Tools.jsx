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

                {/* --- TIKTOK SECTION --- */}
                <div className="mb-24">
                    <RevealOnScroll>
                        <h3 className="text-2xl font-heading tracking-widest text-white/50 mb-10 border-b border-white/10 pb-4">
                            <span className="text-brand-accent">01.</span> REDES SOCIAIS
                        </h3>
                    </RevealOnScroll>

                    <div className="max-w-4xl mx-auto">
                        <RevealOnScroll>
                            <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 border-brand-accent/10 relative overflow-hidden group hover:border-brand-accent/30 transition-all duration-500">
                                <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                <div className="w-24 h-24 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                    </svg>
                                </div>

                                <div className="flex-1 text-center md:text-left relative z-10">
                                    <div className="flex flex-col md:flex-row items-center md:items-end gap-3 mb-4">
                                        <h3 className="text-3xl md:text-4xl font-heading text-white tracking-tighter">RuanziTwo</h3>
                                        <span className="px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-[10px] font-bold uppercase tracking-widest border border-brand-accent/10 mb-1">TikTok Oficial</span>
                                    </div>
                                    <p className="text-slate-400 font-light mb-8 leading-relaxed">
                                        Acompanhe meus trabalhos mais recentes, tutoriais rápidos e bastidores exclusivos das produções. Conteúdo novo toda semana!
                                    </p>
                                    <motion.a
                                        href="https://tiktok.com/@ruanzitwo"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-brand-accent text-brand-dark font-heading text-sm rounded-xl hover:shadow-lg hover:shadow-brand-accent/20 transition-all font-bold"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                        </svg>
                                        <span>SEGUIR NO TIKTOK</span>
                                    </motion.a>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>

                {/* --- PLUGINS SECTION --- */}
                <div className="mb-24">
                    <RevealOnScroll>
                        <h3 className="text-2xl font-heading tracking-widest text-white/50 mb-10 border-b border-white/10 pb-4">
                            <span className="text-brand-accent">02.</span> PLUGINS & EXTENSIONS
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





            </div>
        </section>
    );
};

export default Tools;
