const Footer = () => {
    return (
        <footer className="py-10 bg-black text-white/20 text-center text-sm border-t border-white/5">
            <p className="font-medium">&copy; {new Date().getFullYear()} RuanziTwo. Proibida a reprodução.</p>
            <p className="text-[10px] text-brand-accent/40 mt-3 font-mono tracking-widest uppercase">Redline Engine v2.0.0 • optimized</p>
        </footer>
    );
};
export default Footer;
