const Footer = () => {
    return (
        <footer className="py-12 bg-transparent text-center border-t border-white/5 mx-6">
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-brand-accent flex items-center justify-center text-brand-dark font-heading text-xs">R</div>
                    <span className="font-heading text-sm tracking-widest">RUANZI<span className="text-brand-accent">TWO</span></span>
                </div>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
                    &copy; {new Date().getFullYear()} • Todos os direitos reservados
                </p>
                <div className="mt-4 flex items-center gap-4 opacity-10 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                    <span className="text-[9px] font-black tracking-widest">EMERALD ENGINE v3.0</span>
                    <div className="w-1 h-1 bg-brand-accent rounded-full"></div>
                    <span className="text-[9px] font-black tracking-widest">PURE GLASS UI</span>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
