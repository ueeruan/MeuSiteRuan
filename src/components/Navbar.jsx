import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Início', href: '#home' },
        { name: 'Sobre', href: '#about' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Ferramentas', href: '#tools' },
        { name: 'PROMOÇÃO', href: '#pricing', isSpecial: true },
        { name: 'Em desenvolvimento', href: '/feedback', isNewTab: true },
        { name: 'Contato', href: '#contact' },
    ];

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <a href="#home" className="text-2xl font-bold tracking-tighter text-white">
                    RZ<span className="text-brand-accent">.</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        link.isSpecial ? (
                            <a
                                key={link.name}
                                href={link.href}
                                className="relative overflow-hidden px-5 py-2 rounded-full bg-gradient-to-r from-brand-accent to-purple-600 text-white font-bold text-sm tracking-wider shadow-lg shadow-brand-accent/30 hover:scale-105 transition-transform"
                            >
                                <div className="absolute inset-0 animate-shimmer mix-blend-overlay"></div>
                                {link.name}
                            </a>
                        ) : (
                            <a
                                key={link.name}
                                href={link.href}
                                target={link.isNewTab ? "_blank" : "_self"}
                                rel={link.isNewTab ? "noopener noreferrer" : ""}
                                className={`text-white/80 hover:text-white hover:text-brand-accent transition-colors text-sm uppercase tracking-widest font-medium ${link.isNewTab ? 'border-b border-brand-accent/50 text-brand-accent/90' : ''}`}
                            >
                                {link.name}
                            </a>
                        )
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white" onClick={toggleMenu}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-0 w-full bg-black/95 border-b border-white/10 py-8 flex flex-col items-center gap-6 md:hidden"
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target={link.isNewTab ? "_blank" : "_self"}
                                    rel={link.isNewTab ? "noopener noreferrer" : ""}
                                    className={`text-xl transition-colors ${link.isSpecial
                                            ? "text-brand-accent font-bold"
                                            : "text-white/80 hover:text-brand-accent"
                                        } ${link.isNewTab ? "italic text-brand-accent/80" : ""}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
