import RevealOnScroll from './RevealOnScroll';
import { Phone, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section className="py-32 bg-transparent text-white relative overflow-hidden" id="contact">
            <div className="container mx-auto px-4 text-center">
                <RevealOnScroll>
                    <div className="flex flex-col items-center mb-20">
                        <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Contato</span>
                        <h2 className="text-5xl md:text-8xl font-heading tracking-tighter">
                            VAMOS CRIAR <span className="text-brand-accent italic">ALGO NOVO?</span>
                        </h2>
                    </div>
                </RevealOnScroll>

                <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
                    {[
                        {
                            href: "https://wa.me/5588996126717",
                            icon: Phone,
                            label: "(88) 99612-6717",
                            tag: "WhatsApp"
                        },
                        {
                            href: "https://instagram.com/ru4neditsz",
                            icon: Instagram,
                            label: "@ru4neditsz",
                            tag: "Instagram"
                        },
                        {
                            href: "https://tiktok.com/@ruanzitwo",
                            icon: ({ className }) => (
                                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            ),
                            label: "ruanzitwo",
                            tag: "TikTok"
                        }
                    ].map((item, i) => (
                        <RevealOnScroll key={i} delay={i * 0.1}>
                            <motion.a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -10 }}
                                className="flex flex-col items-center gap-6 group glass-panel p-10 rounded-[3rem] w-full md:w-64 border-brand-accent/5 hover:border-brand-accent/40 transition-all duration-700"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-brand-accent/5 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-dark transition-all duration-500">
                                    <item.icon size={28} />
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-accent/40">{item.tag}</span>
                                    <span className="font-heading text-lg tracking-tight group-hover:text-brand-accent transition-colors">
                                        {item.label}
                                    </span>
                                </div>
                            </motion.a>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;
