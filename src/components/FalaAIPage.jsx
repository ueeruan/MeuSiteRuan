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
                <div className="max-w-[95%] mx-auto flex flex-col gap-8 mb-10 h-[85vh]">
                    {/* Header Compacto */}
                    <div className="flex items-center justify-between shrink-0">
                        <div>
                            <span className="text-blue-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-2 block flex items-center gap-2">
                                <Terminal size={12} /> IDE Agent
                            </span>
                            <h2 className="text-3xl font-heading tracking-tighter">
                                FALA <span className="text-blue-500 italic">AI</span> <span className="text-white/20 text-lg ml-2">.DEV MODE</span>
                            </h2>
                        </div>
                    </div>

                    {/* Main IDE Area */}
                    <div className="flex-grow relative">
                        <div className="absolute inset-0">
                            <FalaAI />
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer removed from this view or made compact if needed, 
                but for IDE feel we might want full height. 
                Let's keep it simple for now and rely on the container. */}
        </motion.div>
    );
};

export default FalaAIPage;
