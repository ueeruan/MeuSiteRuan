import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageSquareText } from 'lucide-react';

const FloatingChat = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Don't show if already on services page (where the chat is)
    if (location.pathname === '/servicos') return null;

    const Eye = () => {
        const eyeRef = useRef(null);
        const pupilX = useSpring(0, { stiffness: 400, damping: 30 });
        const pupilY = useSpring(0, { stiffness: 400, damping: 30 });

        useEffect(() => {
            return mouseX.on("change", (latestX) => {
                if (!eyeRef.current) return;
                const rect = eyeRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const dx = latestX - centerX;
                const dy = mouseY.get() - centerY;
                const angle = Math.atan2(dy, dx);
                const distance = Math.min(5, Math.hypot(dx, dy) / 15);

                pupilX.set(Math.cos(angle) * distance);
                pupilY.set(Math.sin(angle) * distance);
            });
        }, []);

        return (
            <div ref={eyeRef} className="w-2.5 h-2.5 bg-white rounded-full relative flex items-center justify-center border-[0.5px] border-black/10">
                <motion.div
                    style={{ x: pupilX, y: pupilY }}
                    className="w-1.5 h-1.5 bg-brand-dark rounded-full"
                />
            </div>
        );
    };

    return (
        <motion.div
            ref={widgetRef}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/servicos')}
            className="fixed top-8 right-8 z-[150] cursor-pointer group"
        >
            {/* Tooltip */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileHover={{ opacity: 1, x: -10 }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-brand-accent text-brand-dark px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap pointer-events-none shadow-xl shadow-brand-accent/20"
            >
                Fazer Orçamento
            </motion.div>

            {/* Character Body */}
            <div className="w-16 h-16 glass-panel rounded-2xl flex flex-col items-center justify-center gap-2 border-brand-accent/30 shadow-emerald-glow group-hover:border-brand-accent transition-colors duration-500 overflow-hidden relative">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-brand-accent/5 group-hover:bg-brand-accent/20 transition-colors" />

                {/* Eyes Container */}
                <div className="flex gap-2 relative z-10">
                    <Eye />
                    <Eye />
                </div>

                {/* Mouth/Icon */}
                <motion.div
                    animate={{
                        y: [0, -2, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-brand-accent relative z-10"
                >
                    <MessageSquareText size={18} />
                </motion.div>
            </div>

            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-accent rounded-full border-2 border-brand-dark flex items-center justify-center animate-bounce">
                <div className="w-1.5 h-1.5 bg-brand-dark rounded-full" />
            </div>
        </motion.div>
    );
};

export default FloatingChat;
