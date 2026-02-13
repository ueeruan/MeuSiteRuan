import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIResponse, transcribeAudio } from '../services/ai';
import { Send, User, MessageSquare, Clock, Calendar, CheckCircle, Sparkles, Tag, Terminal, Mic, Square } from 'lucide-react';

const ProposalChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const chatEndRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (messages.length === 0) {
            initChat();
        }
    }, []);

    useEffect(scrollToBottom, [messages, isTyping]);

    const initChat = async () => {
        setIsTyping(true);
        const welcome = "Olá! Eu sou o Assistente Virtual do RuanziTwo. Estou aqui para te ajudar a montar a proposta perfeita para seus vídeos. Como posso te chamar? (Você também pode mandar um áudio clicando no microfone! 🎙️)";
        setTimeout(() => {
            setMessages([{ role: 'assistant', content: welcome, id: Date.now() }]);
            setIsTyping(false);
        }, 1000);
    };

    const startRecording = async () => {
        try {
            console.log("Iniciando gravação...");
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Detect supported MIME type
            const mimeType = MediaRecorder.isTypeSupported('audio/webm')
                ? 'audio/webm'
                : 'audio/ogg';

            console.log("MIME Type selecionado:", mimeType);
            mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
                console.log("Gravação finalizada. Blob criado:", audioBlob.size, "bytes");

                if (audioBlob.size < 100) {
                    console.warn("Áudio muito curto ou vazio.");
                    setMessages(prev => [...prev, { role: 'assistant', content: "Parece que o áudio ficou muito curto ou vazio. Pode tentar segurar o botão por mais tempo?", id: Date.now() }]);
                    setIsTyping(false);
                    return;
                }

                setIsTyping(true);
                // Groq expects a proper extension. webm/ogg work fine.
                const extension = mimeType.split('/')[1];
                const transcription = await transcribeAudio(audioBlob, extension);

                if (transcription) {
                    handleSend(transcription);
                } else {
                    setMessages(prev => [...prev, { role: 'assistant', content: "Não consegui processar seu áudio. Pode tentar escrever ou mandar outro?", id: Date.now() }]);
                    setIsTyping(false);
                }
            };

            // Request data every second just in case
            mediaRecorderRef.current.start(1000);
            setIsRecording(true);
        } catch (err) {
            console.error("Erro ao acessar microfone:", err);
            alert("Não foi possível acessar seu microfone. Verifique as permissões do navegador.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    const handleSend = async (text) => {
        if (!text.trim() || isFinished) return;

        const userMsg = { role: 'user', content: text, id: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Functional update to avoid stale messages in async calls
        setMessages(prev => {
            const historyForAI = prev.map(m => ({
                role: m.role,
                content: m.content
            }));

            getAIResponse(historyForAI).then(aiResponse => {
                setMessages(current => [...current, {
                    role: 'assistant',
                    content: aiResponse,
                    id: Date.now()
                }]);
                setIsTyping(false);
            });

            return prev;
        });
    };

    const generateWhatsAppLink = () => {
        const phone = "5588996126717";
        const history = messages
            .map(m => `*${m.role === 'user' ? 'Cliente' : 'IA'}:* ${m.content}`)
            .join('\n\n');

        const message = `*Consultoria Finalizada - RuanziTwo AI*\n\n--- HISTÓRICO ---\n\n${history}\n\n--- FIM ---\n_Enviado através do site_`;

        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    };

    const progress = Math.min((messages.length / 10) * 100, 100);

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
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 15, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-lg ${msg.role === 'user'
                                ? 'bg-brand-accent text-brand-dark font-bold rounded-tr-none'
                                : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'}`}
                            >
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-3 items-center">
                                <span className="text-[10px] text-brand-accent/60 font-bold uppercase tracking-widest">
                                    {isRecording ? "Gravando..." : "Pensando..."}
                                </span>
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 bg-brand-accent rounded-full animate-bounce [animation-duration:0.6s]" />
                                    <div className="w-1 h-1 bg-brand-accent/60 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]" />
                                    <div className="w-1 h-1 bg-brand-accent/30 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {messages.length > 5 && !isFinished && !isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-center pt-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsFinished(true)}
                                className="px-6 py-3 bg-brand-accent/10 border border-brand-accent/30 text-brand-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-emerald-glow flex items-center gap-2"
                            >
                                <CheckCircle size={14} /> Finalizar Consultoria
                            </motion.button>
                        </motion.div>
                    )}

                    {isFinished && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full bg-brand-accent/5 border border-brand-accent/20 rounded-3xl p-6 space-y-4 shadow-2xl"
                        >
                            <div className="flex items-center gap-2 text-brand-accent font-heading text-[10px] tracking-[0.2em]">
                                <Sparkles size={14} /> CONSULTORIA FINALIZADA
                            </div>
                            <p className="text-[11px] text-white/60 leading-relaxed italic">
                                "Tudo pronto! Clique no botão abaixo para me enviar o resumo da nossa conversa e fechar os detalhes agora mesmo."
                            </p>
                            <motion.a
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                href={generateWhatsAppLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 w-full py-4 bg-brand-accent text-brand-dark font-heading text-[10px] rounded-2xl shadow-xl shadow-brand-accent/20 transition-all font-black uppercase tracking-widest"
                            >
                                ENVIAR RESUMO PARA O WHATSAPP
                            </motion.a>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="p-4 bg-black/40 border-t border-white/5">
                <div className="relative flex items-center gap-2">
                    <div className="relative flex-grow flex items-center">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={isFinished ? "Consultoria Finalizada" : (isRecording ? "Gravando áudio..." : "Diga algo para a IA...")}
                            disabled={isFinished || isTyping || isRecording}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-5 pr-14 text-[13px] focus:outline-none focus:border-brand-accent/50 transition-colors disabled:opacity-50 text-white"
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim() || isTyping || isFinished || isRecording}
                            className="absolute right-2 p-2.5 bg-brand-accent text-brand-dark rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                        >
                            <Send size={16} />
                        </button>
                    </div>

                    {!isFinished && (
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={isRecording ? stopRecording : startRecording}
                            disabled={isTyping}
                            className={`p-3.5 rounded-xl flex items-center justify-center transition-all shadow-lg ${isRecording
                                ? 'bg-red-500 text-white animate-pulse shadow-red-500/20'
                                : 'bg-brand-accent/10 border border-brand-accent/20 text-brand-accent hover:bg-brand-accent/20 shadow-emerald-glow'
                                } disabled:opacity-50`}
                        >
                            {isRecording ? <Square size={16} fill="currentColor" /> : <Mic size={16} />}
                        </motion.button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProposalChat;
