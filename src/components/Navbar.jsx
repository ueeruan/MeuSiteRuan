import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const navLinks = [
        { name: 'Início', href: '#home', id: 'home' },
        { name: 'Sobre', href: '#about', id: 'about' },
        { name: 'Portfólio', href: '#portfolio', id: 'portfolio' },
        { name: 'Ferramentas', href: '#tools', id: 'tools' },
        { name: 'Contato', href: '#contact', id: 'contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Active section detection
            const sections = navLinks.map(link => document.getElementById(link.id));
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                if (section) {
                    const top = section.offsetTop;
                    const height = section.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section.id);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        setIsOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6 transition-all duration-500">
            <div className={`max-w-6xl mx-auto flex items-center justify-between px-8 py-4 rounded-full transition-all duration-500 ${scrolled ? 'glass-panel !bg-brand-surface/80 emerald-glow border-brand-accent/20 px-10' : 'bg-transparent border border-white/5'}`}>
                {/* Logo */}
                <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="group flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-brand-accent flex items-center justify-center text-brand-dark font-heading text-xl">R</div>
                    <span className="font-heading text-lg tracking-widest hidden sm:block">RUANZI<span className="text-brand-accent">TWO</span></span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-brand-accent relative group ${activeSection === link.id ? 'text-brand-accent' : 'text-white/60'}`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-brand-accent transition-transform duration-300 origin-left ${activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                        </a>
                    ))}

                    <a
                        href="#pricing"
                        onClick={(e) => scrollToSection(e, '#pricing')}
                        className="px-6 py-2 rounded-full border border-brand-accent text-brand-accent text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent hover:text-brand-dark transition-all duration-300"
                    >
                        Promoção
                    </a>
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
                                <motion.a
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className="text-3xl font-heading tracking-widest text-white hover:text-brand-accent transition-colors"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                href="#pricing"
                                onClick={(e) => scrollToSection(e, '#pricing')}
                                className="mt-8 px-12 py-5 bg-brand-accent text-brand-dark font-heading text-xl rounded-2xl shadow-xl shadow-brand-accent/20"
                            >
                                Promoção
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
