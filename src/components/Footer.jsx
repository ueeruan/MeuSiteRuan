const Footer = () => {
    return (
        <footer className="py-6 bg-black text-white/40 text-center text-sm border-t border-white/5">
            <p>&copy; {new Date().getFullYear()} RuanziTwo. Todos os direitos reservados.</p>
            <p className="text-xs text-brand-accent/50 mt-2 font-mono">v1.1.0 • Update Force</p>
        </footer>
    );
};
export default Footer;
