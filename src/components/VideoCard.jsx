import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const VideoCard = ({ project }) => {
    const videoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Desktop: Load immediately
        // Mobile: Load on intersection
        if (window.innerWidth >= 768) {
            setIsLoaded(true);
        } else {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsLoaded(true);
                        observer.disconnect();
                    }
                },
                { rootMargin: "100px", threshold: 0.1 }
            );

            if (videoRef.current) {
                observer.observe(videoRef.current);
            }
            return () => observer.disconnect();
        }

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const getEmbedUrl = (src) => {
        const urlObj = new URL(src);
        const videoId = urlObj.pathname.split('/').pop();
        // Desktop: autoplay, loop. Mobile: autoplay too but lazy loaded by state.
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1`;
    };

    return (
        <motion.div
            ref={videoRef}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/5 group hover:border-brand-accent/40 transition-all duration-500 red-glow"
        >
            {!isLoaded ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-surface animate-shimmer">
                    <div className="w-12 h-12 border-4 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
                    <span className="mt-4 text-xs font-medium text-brand-accent/40 tracking-widest uppercase">Otimizando...</span>
                </div>
            ) : (
                <div className="w-full h-full relative">
                    <iframe
                        className="w-full h-full object-cover scale-[1.01]"
                        src={getEmbedUrl(project.src)}
                        title={project.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>

                    {/* Premium Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                    <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="h-1 w-12 bg-brand-accent mb-4 rounded-full"></div>
                        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-brand-accent transition-colors">
                            {project.title}
                        </h3>
                        <div className="flex gap-3">
                            <span className="text-[10px] font-bold px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full border border-brand-accent/20 uppercase tracking-widest">
                                4K HDR
                            </span>
                            <span className="text-[10px] font-bold px-3 py-1 bg-white/5 text-white/50 rounded-full border border-white/10 uppercase tracking-widest">
                                VFX
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default VideoCard;
