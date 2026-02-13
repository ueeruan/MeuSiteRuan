import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', href: '/', id: 'home' },
        { name: 'Portfolio', href: '/portfolio', id: 'portfolio' },
        { name: 'Serviços', href: '/servicos', id: 'servicos' },
        { name: 'Downloads', href: '/downloads', id: 'downloads' },
        { name: 'FalaAI', href: '/fala-ai', id: 'falaai' },
        { name: 'Contato', href: '/contato', id: 'contato' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] px-4 py-4 transition-all duration-500">
            <div className={`max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${scrolled || location.pathname !== '/' ? 'glass-panel !bg-brand-surface/80 emerald-glow border-brand-accent/20 px-8' : 'bg-transparent border border-white/5'}`}>
                {/* Logo */}
                <NavLink to="/" className="group flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-brand-accent flex items-center justify-center text-brand-dark font-heading text-lg">R</div>
                    <span className="font-heading text-base tracking-widest hidden sm:block">RUANZI<span className="text-brand-accent">TWO</span></span>
                </NavLink>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.href}
                            className={({ isActive }) => `text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-brand-accent relative group ${isActive ? 'text-brand-accent' : 'text-white/60'}`}
                        >
                            {({ isActive }) => (
                                <>
                                    {link.name}
                                    <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-brand-accent transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                                </>
                            )}
                        </NavLink>
                    ))}

                    <NavLink
                        to="/servicos"
                        className="px-5 py-2 rounded-full border border-brand-accent text-brand-accent text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent hover:text-brand-dark transition-all duration-300"
                    >
                        Promoção
                    </NavLink>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white hover:text-brand-accent transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-[90] bg-brand-dark/98 md:hidden flex flex-col items-center justify-center p-8 backdrop-blur-3xl"
                    >
                        <div className="flex flex-col gap-8 text-center">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <NavLink
                                        to={link.href}
                                        className={({ isActive }) => `text-3xl font-heading tracking-widest transition-colors ${isActive ? 'text-brand-accent' : 'text-white hover:text-brand-accent'}`}
                                    >
                                        {link.name}
                                    </NavLink>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <NavLink
                                    to="/servicos"
                                    className="mt-8 px-12 py-5 bg-brand-accent text-brand-dark font-heading text-xl rounded-2xl shadow-xl shadow-brand-accent/20 block"
                                >
                                    Promoção
                                </NavLink>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
