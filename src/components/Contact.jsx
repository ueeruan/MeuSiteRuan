import RevealOnScroll from './RevealOnScroll';
import { Phone, Instagram } from 'lucide-react';

const Contact = () => {
    return (
        <section className="py-24 bg-brand-dark text-white relative overflow-hidden" id="contact">
            <div className="container mx-auto px-4 text-center">
                <RevealOnScroll>
                    <h2 className="text-4xl md:text-6xl font-bold mb-16 tracking-tighter">
                        Vamos criar <span className="text-brand-accent">algo épico?</span>
                    </h2>
                </RevealOnScroll>

                <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-12">
                    {[
                        {
                            href: "https://wa.me/5588996126717",
                            icon: Phone,
                            label: "(88) 99612-6717",
                            hover: "hover:text-brand-accent",
                            glow: "group-hover:bg-brand-accent/20"
                        },
                        {
                            href: "https://instagram.com/ru4neditsz",
                            icon: Instagram,
                            label: "@ru4neditsz",
                            hover: "hover:text-red-500",
                            glow: "group-hover:bg-red-500/20"
                        },
                        {
                            href: "https://tiktok.com/@ruanzitwo",
                            icon: ({ className }) => (
                                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            ),
                            label: "ruanzitwo",
                            hover: "hover:text-white",
                            glow: "group-hover:bg-white/10"
                        }
                    ].map((item, i) => (
                        <RevealOnScroll key={i} delay={i * 0.1}>
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex flex-col items-center gap-4 group transition-all duration-300 ${item.hover}`}
                            >
                                <div className={`p-6 bg-white/5 rounded-3xl border border-white/10 transition-all duration-500 ${item.glow} group-hover:scale-110 group-hover:border-brand-accent/30`}>
                                    <item.icon size={28} />
                                </div>
                                <span className="font-bold tracking-widest text-sm uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                                    {item.label}
                                </span>
                            </a>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;
