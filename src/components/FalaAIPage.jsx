import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, Sparkles, MessageSquare } from 'lucide-react';
import Footer from './Footer';
import RevealOnScroll from './RevealOnScroll';
import FalaAI from './FalaAI';

const FalaAIPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-24 min-h-screen flex flex-col"
        >
            <div className="container mx-auto px-6 flex-grow">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center lg:items-start mb-20">
                    {/* Left Side: Content */}
                    <div className="lg:w-1/2 space-y-8">
                        <RevealOnScroll>
                            <span className="text-blue-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block flex items-center gap-2">
                                <Terminal size={12} /> After Effects Automations
                            </span>
                            <h2 className="text-4xl md:text-5xl font-heading tracking-tighter mb-6">
                                FALA <span className="text-blue-500 italic">AI</span> <br />
                                <span className="text-white/40">EXPLIQUE SUA IDEIA.</span>
                            </h2>
                            <p className="text-white/60 text-lg max-w-lg leading-relaxed">
                                Tem uma ideia de plugin, extensão ou script para acelerar seu workflow no After? <br /><br />
                                Converse com nosso **Expert em Automação** para validar o que é possível e gerar um briefing técnico agora mesmo.
                            </p>
                        </RevealOnScroll>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                            {[
                                { icon: Code, title: "ExtendScript", desc: "Automação de render, camadas e assets." },
                                { icon: Cpu, title: "CEP Panels", desc: "Interfaces complexas e integração externa." },
                                { icon: MessageSquare, title: "Briefing Direto", desc: "A IA prepara tudo e me envia no Zap." },
                                { icon: Sparkles, title: "Viabilidade", desc: "Saiba na hora se o que você quer é possível." }
                            ].map((item, i) => (
                                <RevealOnScroll key={i} delay={i * 0.1}>
                                    <div className="flex gap-4">
                                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 h-fit">
                                            <item.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-heading text-xs tracking-widest text-white uppercase mb-1">{item.title}</h4>
                                            <p className="text-[10px] text-white/40 leading-relaxed font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Chat Container */}
                    <div className="lg:w-1/2 w-full">
                        <RevealOnScroll delay={0.2}>
                            <div className="relative">
                                {/* Decorative elements */}
                                <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full z-0 opacity-50" />
                                <div className="relative z-10">
                                    <FalaAI />
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
            <Footer />
        </motion.div>
    );
};

export default FalaAIPage;
