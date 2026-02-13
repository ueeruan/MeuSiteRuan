import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
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
        { name: 'Em desenvolvimento', href: '/#/feedback', isNewTab: true },
        { name: 'Contato', href: '#contact' },
    ];

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleNavClick = (e, href) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${isScrolled
                ? 'bg-brand-dark/80 backdrop-blur-xl border-white/10 py-4 shadow-lg shadow-black/20'
                : 'bg-transparent border-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <a
                    href="#home"
                    onClick={(e) => handleNavClick(e, '#home')}
                    className="text-2xl font-bold tracking-tighter text-white relative z-50"
                >
                    RZ<span className="text-brand-accent">.</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        link.isSpecial ? (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="ml-4 relative overflow-hidden px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-accent to-purple-600 text-white font-bold text-sm tracking-wider shadow-lg shadow-brand-accent/25 hover:shadow-brand-accent/40 transition-all border border-brand-accent/20"
                            >
                                <div className="absolute inset-0 animate-shimmer mix-blend-overlay"></div>
                                {link.name}
                            </motion.a>
                        ) : (
                            <a
                                key={link.name}
                                href={link.href}
                                target={link.isNewTab ? "_blank" : "_self"}
                                rel={link.isNewTab ? "noopener noreferrer" : ""}
                                onClick={(e) => !link.isNewTab && handleNavClick(e, link.href)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group overflow-hidden ${link.isNewTab
                                    ? 'text-brand-accent hover:bg-brand-accent/10'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <span className="relative z-10">{link.name}</span>
                            </a>
                        )
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors z-50"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-0 bg-[#020617] flex flex-col items-center justify-center gap-10 md:hidden z-[100]"
                        >
                            <div className="flex flex-col items-center gap-8 w-full px-6">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                        target={link.isNewTab ? "_blank" : "_self"}
                                        rel={link.isNewTab ? "noopener noreferrer" : ""}
                                        className={`text-2xl font-bold tracking-tight text-center py-2 w-full transition-all active:scale-95 ${link.isSpecial
                                            ? "text-brand-accent bg-brand-accent/10 rounded-xl"
                                            : "text-white/90 hover:text-white"
                                            } ${link.isNewTab ? "text-lg text-brand-accent/60 italic underline decoration-brand-accent/30" : ""}`}
                                        onClick={(e) => !link.isNewTab && handleNavClick(e, link.href)}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
