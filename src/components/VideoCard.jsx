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
        // Desktop: clean look (controls=0). Mobile: allow manual playback (controls=1).
        const controls = isMobile ? 1 : 0;
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=${controls}&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1`;
    };

    return (
        <motion.div
            ref={videoRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-[9/16] bg-brand-surface rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 group hover:border-brand-accent/40 transition-all duration-700 emerald-glow"
        >
            {!isLoaded ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-surface animate-shimmer">
                    <div className="w-14 h-14 border-2 border-brand-accent/10 border-t-brand-accent rounded-full animate-spin"></div>
                    <span className="mt-4 text-[10px] font-black text-brand-accent/40 tracking-[0.3em] uppercase">Processing</span>
                </div>
            ) : (
                <div className="w-full h-full relative">
                    <iframe
                        className="w-full h-full object-cover scale-[1.02] group-hover:scale-105 transition-transform duration-1000"
                        src={getEmbedUrl(project.src)}
                        title={project.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>

                    {/* Gradient Overlays */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[0.33, 1, 0.68, 1] pointer-events-none">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-[1px] bg-brand-accent group-hover:w-12 transition-all duration-700"></div>
                            <span className="text-brand-accent text-[9px] font-black uppercase tracking-[0.4em]">
                                {project.category || "Video Edit"}
                            </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-heading text-white mb-4 leading-none tracking-tighter">
                            {project.title}
                        </h3>

                        <div className="flex gap-2">
                            <span className="text-[9px] font-black px-4 py-1.5 bg-white/5 text-white/40 rounded-full border border-white/5 uppercase tracking-[0.2em] backdrop-blur-md">
                                4K HDR
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default VideoCard;
