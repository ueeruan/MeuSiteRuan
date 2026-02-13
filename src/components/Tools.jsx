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
    },
    {
        id: 2,
        title: "Extension 999+",
        description: "A extensão definitiva para After Effects. Baixe vídeos do YouTube, gere legendas automáticas e organize seus packs em um só lugar.",
        icon: Zap,
        link: "https://drive.google.com/file/d/1V7ZDRCjaA4okTX3Qu10ZILNF697ldXk0/view?usp=sharing",
        tags: ["Extension", "Free"],
        password: "Senha: Sw2kkj",
        category: "Automation"
    },
    { id: 3, title: "VFX Suite 2024", description: "Complete toolkit for realistic visual effects in After Effects.", icon: Zap, link: "https://www.mediafire.com/file/xq33tz12bffd2ka/VFX+Suite+2024.0.1.zip/file", tags: ["VFX", "Suite"], category: "Visual Effects" },
    { id: 4, title: "Glitchify", description: "Create high-quality glitch effects instantly.", icon: Zap, link: "https://www.mediafire.com/file/wtmxb9cgd6mkf17/Glitchify.zip/file", tags: ["Glitch", "FX"], category: "Stylize" },
    { id: 5, title: "Pixel Sorter 2", description: "The tool that started the pixel sorting revolution in AE.", icon: Zap, link: "https://www.mediafire.com/file/10611uzw5q2xppp/AEPixelSorter2_v2.2.2.zip/file", tags: ["Pixel", "Sort"], category: "Glitch" },
    { id: 6, title: "Pixel Sorter 3", description: "The latest version of the classic pixel sorting effect.", icon: Zap, link: "https://www.mediafire.com/file/6t0eeidi53tntdr/Pixel+Sorter+3.rar/file", tags: ["Pixel", "V3"], category: "Glitch" },
    { id: 7, title: "Twixtor Pro", description: "Intelligent slow motion and speed ramping.", icon: Zap, link: "https://www.mediafire.com/file/zm36stwvbi1mft5/Twixtor+Pro+v7.5.5.rar/file", tags: ["SlowMo", "Time"], category: "Time" },
    { id: 8, title: "Twitch", description: "Synchronized chaotic effects for motion graphics.", icon: Zap, link: "https://www.mediafire.com/file/8lg1hds1ec5jzyi/Twitch.rar/file", tags: ["Chaos", "FX"], category: "Stylize" },
    { id: 9, title: "Boris FX Continuum", description: "The world's most complete plugin collection.", icon: Zap, link: "https://www.mediafire.com/file/wgs28vczpa8ayuj/Boris+FX+Continuum+Plugi-ins+2024.5+V17.5.1.1404+(WIN).zip/file", tags: ["Suite", "Pro"], category: "VFX" },
    { id: 10, title: "RSMB", description: "ReelSmart Motion Blur - Natural motion blur generator.", icon: Zap, link: "https://www.mediafire.com/file/3fvnihrbgsvzyi7/RSMB_%282%29.zip/file", tags: ["Blur", "Motion"], category: "Utility" },
    { id: 11, title: "Element 3D v2.2", description: "High-performance 3D particle based object engine.", icon: Package, link: "https://www.mediafire.com/file/go0d2s1phvtbw94/Element3D2.2.3.2192.zip/file", tags: ["3D", "Render"], category: "3D" },
    { id: 12, title: "Deep Glow", description: "Physically accurate glow generator.", icon: Zap, link: "https://www.mediafire.com/file/3q59b7w15sd1snp/Deep-Glow-v1.6-(WIN).zip/file", tags: ["Glow", "Lighting"], category: "Stylize" }
];

const softwareData = [
    { title: "After Effects 2020", link: "https://www.mediafire.com/file/toez8rl4nupqh07/After_Effects_2020.rar/file", icon: Disc, tag: "v2020" },
    { title: "After Effects 2021", link: "http://mediafire.com/file/rzvgpdfxv3myucd/After_Effects_2021.zip/file", icon: Disc, tag: "v2021" },
    { title: "After Effects 2025", link: "https://www.mediafire.com/file/2q64rcfsmh5882c/After.Effects.2025.zip/file", icon: Disc, tag: "v2025" },
    { title: "Media Encoder 2020", link: "https://www.mediafire.com/file/0rc4jcypip0l4q7/Media_Encoder_2020.zip/file", icon: Disc, tag: "v2020" },
    { title: "Media Encoder 2021", link: "https://www.mediafire.com/file/qi4h1cu2mc6head/Adobe_Media_Encoder_2021_v15.4.1.5_%28x64%29_Multilingual.rar/fil", icon: Disc, tag: "v2021" },
    { title: "Media Encoder 2024", link: "https://www.mediafire.com/file/bu07llw5bmpzq4d/Media_Encoder_2024.zip/file", icon: Disc, tag: "v2024" },
    { title: "Adobe Collection (Drive)", link: "https://drive.google.com/file/d/1KXxx_CojOKEp6SIoG3zs2-QAkQuSukQ8/view", icon: Disc, tag: "Pack" },
    { title: "Premiere Pro 2022", link: "https://www.mediafire.com/file/r9y8j26kudyoxg1/Adobe_Premiere_Pro_2022_22.6.2.2-FP.rar/file", icon: Disc, tag: "v2022" },
    { title: "Speech to Text 2023", link: "https://www.mediafire.com/file/ckjwb5xz07w1smr/Speech_to_Text_Premiere_Pro_2023.zip/file", icon: Mic, tag: "Add-on" },
];

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

                {/* --- SOFTWARE SECTION --- */}
                <div className="mb-24">
                    <RevealOnScroll>
                        <h3 className="text-2xl font-heading tracking-widest text-white/50 mb-10 border-b border-white/10 pb-4">
                            <span className="text-brand-accent">02.</span> SOFTWARE (ADOBE)
                        </h3>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {softwareData.map((sw, index) => (
                            <RevealOnScroll key={index} delay={index * 0.1}>
                                <div className="glass-panel rounded-[2rem] p-6 hover:bg-white/5 transition-colors group">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:text-white group-hover:bg-blue-500 transition-colors">
                                            <sw.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-heading text-lg tracking-tight text-white">{sw.title}</h4>
                                            <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-white/40">{sw.tag}</span>
                                        </div>
                                    </div>
                                    <motion.a
                                        href={sw.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3 rounded-xl bg-white/5 hover:bg-brand-accent hover:text-brand-dark text-white/60 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all border border-white/5 hover:border-transparent"
                                    >
                                        <Download size={14} />
                                        <span>Download</span>
                                    </motion.a>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>

                {/* --- CREDITS --- */}
                <RevealOnScroll>
                    <div className="text-center py-12 border-t border-white/5">
                        <p className="text-white/20 text-xs font-mono tracking-widest uppercase">
                            Credits to <span className="text-brand-accent font-bold">FaxyEmpire</span>
                        </p>
                    </div>
                </RevealOnScroll>

            </div>
        </section>
    );
};

export default Tools;
