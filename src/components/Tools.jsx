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
        color: "brand-blue"
    },
    {
        id: 2,
        title: "Extension 999+",
        description: "A extensão definitiva para After Effects. Baixe vídeos do YouTube, gere legendas automáticas e organize seus packs em um só lugar.",
        icon: Zap,
        link: "https://drive.google.com/file/d/1V7ZDRCjaA4okTX3Qu10ZILNF697ldXk0/view?usp=sharing",
        tags: ["Extension", "YT Downloader", "Grátis"],
        password: "Senha: Sw2kkj",
        color: "purple-600"
    }
];

const Tools = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-brand-dark to-black text-white" id="tools">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold mb-12 text-center"
                >
                    Ferramentas & Recursos
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {toolsData.map((tool, index) => (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-md flex flex-col h-full"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white bg-${tool.color}/20`}>
                                    <tool.icon size={28} className={tool.id === 2 ? "text-purple-400" : "text-brand-accent"} />
                                </div>
                                <div className="flex gap-2">
                                    {tool.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/10 text-white/60 text-xs rounded-full border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-3">{tool.title}</h3>
                            <p className="text-gray-400 leading-relaxed mb-8 flex-grow">
                                {tool.description}
                            </p>

                            {tool.password && (
                                <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
                                    <p className="text-red-300 font-mono text-sm tracking-wider">{tool.password}</p>
                                </div>
                            )}

                            <div className="mt-auto">
                                <motion.a
                                    href={tool.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-colors ${tool.id === 2
                                        ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20"
                                        : "bg-brand-accent hover:bg-brand-blue text-white shadow-lg shadow-brand-accent/20"
                                        }`}
                                >
                                    <Download size={20} />
                                    Baixar Agora
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tools;
