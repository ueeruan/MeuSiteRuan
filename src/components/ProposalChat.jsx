import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, MessageSquare, Clock, Calendar, CheckCircle, Sparkles } from 'lucide-react';

const QUESTIONS = [
    { id: 'name', text: "Olá! Vamos montar sua proposta personalizada 🎬. Para começar, qual seu nome?", icon: User },
    { id: 'service', text: "Prazer em te conhecer! Que tipo de vídeo você precisa? (Edição, Motion Graphics, Vertical/Reels...)", icon: MessageSquare },
    { id: 'duration', text: "Certo! E qual a duração aproximada do material final?", icon: Clock },
    { id: 'deadline', text: "Entendido. Qual seu prazo ideal para entrega?", icon: Calendar },
    { id: 'observations', text: "Alguma observação adicional ou referência que queira compartilhar?", icon: Sparkles }
];

const ProposalChat = () => {
    const [messages, setMessages] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [formData, setFormData] = useState({});
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Initial bot message
        if (messages.length === 0) {
            sendBotMessage(QUESTIONS[0].text);
        }
    }, []);

    useEffect(scrollToBottom, [messages, isTyping]);

    const sendBotMessage = (text) => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { type: 'bot', text, id: Date.now() }]);
            setIsTyping(false);
        }, 1500);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const val = inputValue.trim();
        const updatedMessages = [...messages, { type: 'user', text: val, id: Date.now() }];
        setMessages(updatedMessages);

        const currentQuestionId = QUESTIONS[currentStep].id;
        const newFormData = { ...formData, [currentQuestionId]: val };
        setFormData(newFormData);

        setInputValue('');

        if (currentStep < QUESTIONS.length - 1) {
            setCurrentStep(prev => prev + 1);
            sendBotMessage(QUESTIONS[currentStep + 1].text);
        } else {
            // Final Step - Summary
            setTimeout(() => {
                sendBotMessage("Perfeito! Juntei todas as informações. Vou preparar o link para meu WhatsApp agora!");
                setMessages(prev => [...prev, { type: 'summary', data: newFormData, id: 'summary' }]);
            }, 1000);
        }
    };

    const generateWhatsAppLink = () => {
        const phone = "5588996126717";
        const message = `*Proposta Personalizada - ${formData.name}*
        
🎬 *Serviço:* ${formData.service}
⏳ *Duração:* ${formData.duration}
🗓️ *Prazo:* ${formData.deadline}
📝 *Obs:* ${formData.observations || 'Nenhuma'}

_Enviado através do site RuanziTwo_`;

        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    };

    return (
        <div className="max-w-xl mx-auto glass-panel rounded-[2rem] overflow-hidden flex flex-col h-[520px] border-brand-accent/10 shadow-emerald-glow">
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center text-brand-dark">
                    <MessageSquare size={20} />
                </div>
                <div>
                    <h3 className="font-heading text-sm tracking-widest">PROPOSTA INTERATIVA</h3>
                    <span className="text-[9px] text-brand-accent font-black uppercase tracking-widest animate-pulse">Online Agora</span>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.type === 'summary' ? (
                                <div className="w-full bg-brand-accent/5 border border-brand-accent/20 rounded-3xl p-6 space-y-4">
                                    <div className="flex items-center gap-2 text-brand-accent font-heading text-xs tracking-widest">
                                        <CheckCircle size={14} /> RESUMO DA SOLICITAÇÃO
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {Object.entries(msg.data).map(([key, val]) => (
                                            <div key={key}>
                                                <span className="text-[10px] text-white/40 uppercase font-bold block">{key}</span>
                                                <span className="text-sm text-white/80">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <a
                                        href={generateWhatsAppLink()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-3 w-full py-4 bg-brand-accent text-brand-dark font-heading text-xs rounded-2xl hover:scale-[1.02] transition-transform"
                                    >
                                        ENVIAR PARA WHATSAPP
                                    </a>
                                </div>
                            ) : (
                                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.type === 'user'
                                    ? 'bg-brand-accent text-brand-dark font-medium rounded-tr-none'
                                    : 'bg-white/5 border border-white/10 text-white/80 rounded-tl-none'}`}
                                >
                                    {msg.text}
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-brand-accent/40 rounded-full animate-bounce" />
                                    <div className="w-1.5 h-1.5 bg-brand-accent/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-1.5 h-1.5 bg-brand-accent/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-black/40 border-t border-white/5">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={currentStep === QUESTIONS.length ? "Conversa encerrada" : "Digite sua mensagem..."}
                        disabled={currentStep === QUESTIONS.length || isTyping}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-5 pr-14 text-sm focus:outline-none focus:border-brand-accent/50 transition-colors disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className="absolute right-2 p-3 bg-brand-accent text-brand-dark rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProposalChat;
