import { motion } from 'framer-motion';
import { Phone, Instagram } from 'lucide-react';

const Contact = () => {
    return (
        <section className="py-20 bg-gradient-to-t from-black to-brand-dark text-white" id="contact">
            <div className="container mx-auto px-4 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold mb-12"
                >
                    Vamos Trabalhar Juntos?
                </motion.h2>

                <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                    <a href="https://wa.me/5588996126717" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xl hover:text-brand-accent transition-colors group">
                        <div className="p-3 bg-white/5 rounded-full group-hover:bg-brand-accent/20 transition-colors">
                            <Phone className="w-6 h-6" />
                        </div>
                        <span>(88) 99612-6717</span>
                    </a>

                    <a href="https://instagram.com/ru4neditsz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xl hover:text-pink-500 transition-colors group">
                        <div className="p-3 bg-white/5 rounded-full group-hover:bg-pink-500/20 transition-colors">
                            <Instagram className="w-6 h-6" />
                        </div>
                        <span>@ru4neditsz</span>
                    </a>

                    <a href="https://tiktok.com/@ruanzitwo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xl hover:text-cyan-400 transition-colors group">
                        <div className="p-3 bg-white/5 rounded-full group-hover:bg-cyan-400/20 transition-colors">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                        </div>
                        <span>ruanzitwo</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
