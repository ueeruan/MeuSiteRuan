import { motion } from 'framer-motion';
import { Phone, Instagram, Mail, MessageCircle, Clock, MapPin } from 'lucide-react';
import Footer from './Footer';
import RevealOnScroll from './RevealOnScroll';

const ContactItem = ({ href, icon: Icon, label, tag, color, subtext }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -8, scale: 1.02 }}
        className="glass-panel p-10 rounded-[3rem] group border-brand-accent/5 hover:border-brand-accent/30 transition-all duration-700 flex flex-col items-center text-center relative overflow-hidden"
    >
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />

        <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:bg-brand-accent group-hover:text-brand-dark transition-all duration-500 mb-6">
            <Icon size={32} />
        </div>

        <div className="space-y-2 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent/40">{tag}</span>
            <h3 className="font-heading text-xl tracking-tight text-white group-hover:text-brand-accent transition-colors">{label}</h3>
            <p className="text-[11px] text-white/30 font-medium tracking-wide uppercase">{subtext}</p>
        </div>

        {tag === "WhatsApp" && (
            <div className="mt-8 p-4 bg-white rounded-2xl opacity-10 group-hover:opacity-100 transition-opacity duration-700">
                {/* Simulated QR Code for visual flair */}
                <div className="grid grid-cols-4 gap-1 w-10 h-10">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className={`w-full h-full ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`} />
                    ))}
                </div>
            </div>
        )}
    </motion.a>
);

const ContactPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-32 min-h-screen flex flex-col"
        >
            <div className="container mx-auto px-6 flex-grow">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <RevealOnScroll>
                        <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Networking</span>
                        <h2 className="text-5xl md:text-8xl font-heading tracking-tighter mb-12">
                            VAMOS <span className="text-brand-accent italic">CONVERSAR?</span>
                        </h2>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ContactItem
                            href="https://wa.me/5588996126717"
                            icon={MessageCircle}
                            tag="WhatsApp"
                            label="(88) 99612-6717"
                            subtext="Resposta em até 1 hora"
                            color="from-emerald-500/20 to-transparent"
                        />
                        <ContactItem
                            href="mailto:contato@ruanzitwo.com"
                            icon={Mail}
                            tag="Email"
                            label="contato@ruanzi.com"
                            subtext="Para propostas formais"
                            color="from-blue-500/20 to-transparent"
                        />
                        <ContactItem
                            href="https://instagram.com/ru4neditsz"
                            icon={Instagram}
                            tag="Instagram"
                            label="@ru4neditsz"
                            subtext="DMs sempre abertas"
                            color="from-pink-500/20 to-transparent"
                        />
                    </div>

                    <RevealOnScroll delay={0.3}>
                        <div className="mt-24 grid md:grid-cols-2 gap-12 text-left border-t border-white/5 pt-12">
                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-white/5 rounded-2xl text-brand-accent">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h4 className="font-heading text-sm tracking-widest mb-2 uppercase">ATENDIMENTO</h4>
                                    <p className="text-white/40 text-sm font-medium">Segunda a Sexta: 09h - 19h</p>
                                    <p className="text-white/40 text-sm font-medium">Sábado: 10h - 14h</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-white/5 rounded-2xl text-brand-accent">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-heading text-sm tracking-widest mb-2 uppercase">LOCALIZAÇÃO</h4>
                                    <p className="text-white/40 text-sm font-medium">Brasil - Home Office</p>
                                    <p className="text-white/40 text-sm font-medium">Projetos Remotos para o Mundo</p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
            <Footer />
        </motion.div>
    );
};

export default ContactPage;
