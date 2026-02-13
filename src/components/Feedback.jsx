import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Background from './Background';

const Feedback = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const encodedMessage = encodeURIComponent(`*Feedback sobre Extensão:*\n\n"${message}"`);
        const whatsappUrl = `https://wa.me/5588996126717?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        setMessage('');
    };

    return (
        <div className="bg-brand-dark min-h-screen text-white relative flex items-center justify-center p-4">
            <Background />

            <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-white/50 hover:text-white transition-colors z-20">
                <ArrowLeft size={20} />
                <span>Voltar para Home</span>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative z-10"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-brand-accent/20 rounded-full text-brand-accent">
                        <MessageSquare size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Em Desenvolvimento</h1>
                        <p className="text-white/50 text-sm">Ajude a moldar o futuro das ferramentas</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-lg font-medium block">
                            Editor, que tipo de extensão você acha que te ajudaria a editar mais rápido e por quê?
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ex: Uma extensão que corte silêncios automaticamente seria ótima porque..."
                            className="w-full h-40 bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/50 resize-none transition-all"
                            required
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-4 bg-brand-accent hover:bg-brand-blue text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-brand-accent/20"
                    >
                        <Send size={20} />
                        Enviar Resposta
                    </motion.button>
                </form>

                <p className="mt-6 text-center text-xs text-white/30">
                    Ao clicar em enviar, seu WhatsApp será aberto com a resposta.
                </p>
            </motion.div>
        </div>
    );
};

export default Feedback;
