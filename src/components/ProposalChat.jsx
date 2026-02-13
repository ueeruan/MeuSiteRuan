import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, MessageSquare, Clock, Calendar, CheckCircle, Sparkles, Tag } from 'lucide-react';

const QUESTIONS = [
    { id: 'name', text: "Olá! Vamos montar sua proposta personalizada 🎬. Para começar, qual seu nome?", icon: User },
    {
        id: 'service',
        text: "Prazer em te conhecer! Que tipo de vídeo você precisa?",
        icon: MessageSquare,
        options: ["Edição Social Media", "Motion Graphics", "Reels/TikTok", "Vídeo Institucional", "Outro"]
    },
    {
        id: 'duration',
        text: "Certo! E qual a duração aproximada do material final?",
        icon: Clock,
        options: ["Até 1 min", "1-3 min", "3-10 min", "10 min+"]
    },
    { id: 'deadline', text: "Entendido. Qual seu prazo ideal para entrega?", icon: Calendar },
    { id: 'observations', text: "Alguma observação adicional ou referência que queira compartilhar?", icon: Sparkles },
    { id: 'offer', text: "Para fechar com chave de ouro: você tem alguma proposta de valor ou gostaria de tentar um bônus/desconto especial? Diz aí! 😉", icon: Tag }
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

    const handleSend = (text) => {
        if (!text.trim()) return;

        const val = text.trim();
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
                sendBotMessage("Perfeito! Juntei todas as informações. Vou preparar o link para seu WhatsApp agora!");
                setMessages(prev => [...prev, { type: 'summary', data: newFormData, id: 'summary' }]);
                setCurrentStep(QUESTIONS.length);
            }, 1000);
        }
    };

    const generateWhatsAppLink = () => {
        const phone = "5588996126717";
        const message = `*Proposta Personalizada - ${formData.name}*\n\n🎬 *Serviço:* ${formData.service}\n⏳ *Duração:* ${formData.duration}\n🗓️ *Prazo:* ${formData.deadline}\n📝 *Obs:* ${formData.observations || 'Nenhuma'}\n🏷️ *Proposta/Bônus:* ${formData.offer || 'Nenhuma'}\n\n_Enviado através do site RuanziTwo_`;

        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    };

    const progress = (currentStep / QUESTIONS.length) * 100;

    return (
        <div className="max-w-xl mx-auto glass-panel rounded-[2rem] overflow-hidden flex flex-col h-[520px] border-brand-accent/10 shadow-emerald-glow relative">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-20">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-brand-accent shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-500"
                />
            </div>

            {/* Header */}
            <div className="p-5 border-b border-white/5 bg-white/5 flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-brand-accent flex items-center justify-center text-brand-dark">
                    <MessageSquare size={18} />
                </div>
                <div>
                    <h3 className="font-heading text-xs tracking-widest">PROPOSTA INTERATIVA</h3>
                    <span className="text-[8px] text-brand-accent font-black uppercase tracking-widest animate-pulse">Assistente Ativo</span>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-5 space-y-6 custom-scrollbar">
                <AnimatePresence>
                    {messages.map((msg, idx) => (
                        <div key={msg.id} className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.type === 'summary' ? (
                                    <div className="w-full bg-brand-accent/5 border border-brand-accent/20 rounded-3xl p-6 space-y-4 shadow-2xl">
                                        <div className="flex items-center gap-2 text-brand-accent font-heading text-[10px] tracking-[0.2em]">
                                            <CheckCircle size={14} /> RESUMO DA SOLICITAÇÃO
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-4">
                                            {Object.entries(msg.data).map(([key, val]) => (
                                                <div key={key}>
                                                    <span className="text-[9px] text-white/30 uppercase font-bold block mb-1">{key}</span>
                                                    <span className="text-xs text-white/80 font-medium">{val}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <motion.a
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            href={generateWhatsAppLink()}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-3 w-full py-4 bg-brand-accent text-brand-dark font-heading text-[10px] rounded-2xl shadow-xl shadow-brand-accent/20 transition-all font-black uppercase tracking-widest"
                                        >
                                            ENVIAR PARA WHATSAPP
                                        </motion.a>
                                    </div>
                                ) : (
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-lg ${msg.type === 'user'
                                        ? 'bg-brand-accent text-brand-dark font-bold rounded-tr-none'
                                        : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'}`}
                                    >
                                        {msg.text}
                                    </div>
                                )}
                            </motion.div>

                            {/* Options Chips */}
                            {msg.type === 'bot' && idx === messages.length - 1 && QUESTIONS[currentStep]?.options && !isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex flex-wrap gap-2 pl-2"
                                >
                                    {QUESTIONS[currentStep].options.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => handleSend(opt)}
                                            className="px-4 py-2 bg-brand-accent/10 hover:bg-brand-accent text-brand-accent hover:text-brand-dark border border-brand-accent/30 rounded-full text-[10px] font-bold transition-all duration-300 transform hover:scale-105 active:scale-95"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    ))}

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-duration:0.6s]" />
                                <div className="w-1.5 h-1.5 bg-brand-accent/60 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]" />
                                <div className="w-1.5 h-1.5 bg-brand-accent/30 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="p-4 bg-black/40 border-t border-white/5">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={currentStep >= QUESTIONS.length ? "Pronto! Veja o resumo abaixo." : "Responda aqui..."}
                        disabled={currentStep >= QUESTIONS.length || isTyping}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-5 pr-14 text-[13px] focus:outline-none focus:border-brand-accent/50 transition-colors disabled:opacity-50 text-white"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className="absolute right-2 p-2.5 bg-brand-accent text-brand-dark rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProposalChat;
