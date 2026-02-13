import { motion } from 'framer-motion';
import Pricing from './Pricing';
import ProposalChat from './ProposalChat';
import Footer from './Footer';

const ServicesPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="pt-32"
        >
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Chat Section */}
                    <div className="w-full lg:w-1/2 lg:sticky lg:top-32">
                        <div className="mb-12">
                            <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block text-center lg:text-left">Consultoria</span>
                            <h2 className="text-4xl md:text-6xl font-heading tracking-tighter text-center lg:text-left mb-6">
                                MONTE SUA <span className="text-brand-accent italic">PROPOSTA</span>
                            </h2>
                            <p className="text-white/40 text-sm font-medium leading-relaxed max-w-lg text-center lg:text-left mx-auto lg:mx-0">
                                Sem complicação. Converse com nosso assistente interativo e receba um orçamento personalizado direto no seu WhatsApp em segundos.
                            </p>
                        </div>
                        <ProposalChat />
                    </div>

                    {/* Promotions Section */}
                    <div className="w-full lg:w-1/2 space-y-24 pb-24">
                        <div className="text-center lg:text-left">
                            <span className="text-brand-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Ofertas</span>
                            <h2 className="text-4xl md:text-6xl font-heading tracking-tighter mb-12">
                                PROMOÇÕES <span className="text-brand-accent">ATIVAS</span>
                            </h2>
                        </div>
                        <Pricing />
                    </div>
                </div>
            </div>
            <Footer />
        </motion.div>
    );
};

export default ServicesPage;
