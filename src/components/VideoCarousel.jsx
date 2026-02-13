import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import VideoCard from './VideoCard';

const VideoCarousel = ({ projects }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
            rotateY: direction > 0 ? 45 : -45
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
            rotateY: direction < 0 ? 45 : -45
        })
    };

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, [projects.length]);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }, [projects.length]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    return (
        <div className="relative w-full max-w-5xl mx-auto py-12 px-4 select-none">
            {/* Counter */}
            <div className="absolute top-0 right-8 flex items-center gap-2 text-brand-accent/40 font-heading text-xs tracking-widest">
                <span className="text-brand-accent">{String(currentIndex + 1).padStart(2, '0')}</span>
                <div className="w-8 h-[1px] bg-brand-accent/20"></div>
                <span>{String(projects.length).padStart(2, '0')}</span>
            </div>

            <div className="relative aspect-[9/16] md:aspect-video overflow-visible flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.5 },
                            scale: { duration: 0.5 },
                            rotateY: { duration: 0.5 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = Math.abs(offset.x) * velocity.x;
                            if (swipe < -10000) nextSlide();
                            else if (swipe > 10000) prevSlide();
                        }}
                        className="absolute w-full h-full flex items-center justify-center perspective-[1000px]"
                    >
                        <div className="w-full max-w-sm md:max-w-md h-full">
                            <VideoCard project={projects[currentIndex]} />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-4 md:-mx-16 lg:-mx-24">
                    <motion.button
                        whileHover={{ scale: 1.1, x: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevSlide}
                        className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-white hover:text-brand-accent hover:border-brand-accent/50 transition-all pointer-events-auto shadow-2xl emerald-glow"
                    >
                        <ChevronLeft size={24} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextSlide}
                        className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-white hover:text-brand-accent hover:border-brand-accent/50 transition-all pointer-events-auto shadow-2xl emerald-glow"
                    >
                        <ChevronRight size={24} />
                    </motion.button>
                </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-3 mt-8">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                        }}
                        className="group relative py-4"
                    >
                        <div className={`h-1 transition-all duration-500 rounded-full ${index === currentIndex ? 'w-12 bg-brand-accent' : 'w-4 bg-white/10 group-hover:bg-white/30'}`} />
                    </button>
                ))}
            </div>

            {/* Hint */}
            <div className="mt-8 flex items-center justify-center gap-4 text-white/20 select-none">
                <div className="flex items-center gap-2">
                    <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono">←</kbd>
                    <span className="text-[10px] uppercase tracking-widest">Navegação por Teclado</span>
                    <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono">→</kbd>
                </div>
            </div>
        </div>
    );
};

export default VideoCarousel;
