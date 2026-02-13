import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen w-full flex flex-col justify-center items-center bg-transparent relative overflow-hidden">
            <div className="z-10 text-center px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col items-center"
                >
                    <motion.span
                        initial={{ opacity: 0, tracking: "0em" }}
                        animate={{ opacity: 1, tracking: "0.5em" }}
                        transition={{ delay: 0.5, duration: 1.2 }}
                        className="text-brand-accent text-xs md:text-sm font-bold uppercase mb-6 tracking-[0.5em]"
                    >
                        Professional Video Editor
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="text-[12vw] md:text-[6rem] font-heading leading-none text-white mb-8 select-none"
                    >
                        RUANZI<span className="title-gradient">TWO</span>
                    </motion.h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
                >
                    <div className="flex flex-col items-center md:items-end">
                        <span className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Especialidade</span>
                        <span className="text-white font-medium text-lg">Cortes Dinâmicos</span>
                    </div>
                    <div className="w-px h-12 bg-white/10 hidden md:block"></div>
                    <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xs">
                        <span className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Experiência</span>
                        <span className="text-white/80 text-sm">Elevando o padrão visual de criadores e marcas.</span>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 flex flex-col items-center gap-4"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">Scroll Down</span>
                <div className="w-px h-16 bg-gradient-to-b from-brand-accent to-transparent"></div>
            </motion.div>
        </section>
    );
};

export default Hero;
