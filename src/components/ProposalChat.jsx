import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIResponse, transcribeAudio } from '../services/ai';
import { Send, User, MessageSquare, Clock, Calendar, CheckCircle, Sparkles, Tag, Terminal, Mic, Square, Play, Pause, Trash2, X } from 'lucide-react';

const ProposalChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioPreviewUrl, setAudioPreviewUrl] = useState(null);
    const [recordedBlob, setRecordedBlob] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const chatEndRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const audioRef = useRef(null);

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
            console.log("Iniciando gravação com alta fidelidade...");
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false
                }
            });

            // Detect supported MIME type
            const mimeType = MediaRecorder.isTypeSupported('audio/webm')
                ? 'audio/webm'
                : 'audio/ogg';

            console.log("MIME Type selecionado:", mimeType);
            mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType,
                audioBitsPerSecond: 128000
            });
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
                console.log("Audio captured:", audioBlob.size, "bytes");

                if (audioBlob.size < 500) {
                    console.warn("Audio too small, likely silence.");
                    setMessages(prev => [...prev, { role: 'assistant', content: "Ops, não captei seu áudio. Pode segurar um pouco mais o botão?", id: Date.now() }]);
                    setIsTyping(false);
                    return;
                }

                // Instead of auto-send, set preview
                const url = URL.createObjectURL(audioBlob);
                setAudioPreviewUrl(url);
                setRecordedBlob(audioBlob);
                setIsTyping(false);
            };

            // Record in a single block to avoid concatenation bugs
            mediaRecorderRef.current.start();
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

    const confirmAudio = async () => {
        if (!recordedBlob) return;

        setIsTyping(true);
        const mimeType = recordedBlob.type;
        const extension = mimeType.split('/')[1];

        const blobToSend = recordedBlob;
        discardAudio(); // Clear UI immediately

        const transcription = await transcribeAudio(blobToSend, extension);
        console.log("Transcription result:", transcription);

        if (transcription && transcription.trim().length > 2) {
            const lowerT = transcription.toLowerCase().trim();
            if ((lowerT.includes("obrigada") || lowerT.includes("obrigado")) && transcription.length < 15) {
                setMessages(prev => [...prev, { role: 'assistant', content: "Hum, acho que o áudio saiu muito baixo ou com ruído. Pode repetir ou digitar?", id: Date.now() }]);
                setIsTyping(false);
                return;
            }
            handleSend(transcription);
        } else {
            setMessages(prev => [...prev, { role: 'assistant', content: "Não entendi bem o áudio... Pode tentar gravar novamente?", id: Date.now() }]);
            setIsTyping(false);
        }
    };

    const discardAudio = () => {
        if (audioPreviewUrl) {
            URL.revokeObjectURL(audioPreviewUrl);
        }
        setAudioPreviewUrl(null);
        setRecordedBlob(null);
        setIsPlaying(false);
    };

    const togglePreviewPlayback = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSend = async (text) => {
        if (!text.trim() || isFinished) return;

        const val = text.trim();
        const userMsg = { role: 'user', content: val, id: Date.now() };

        // 1. Update UI immediately
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // 2. Prepare history for AI (using current messages + new one)
        // We use a functional update for safety, but for the API call we can construct it based on current state
        const historyForAI = [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content
        }));

        // 3. Call AI
        try {
            const aiResponse = await getAIResponse(historyForAI);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: aiResponse,
                id: Date.now()
            }]);
        } catch (err) {
            console.error("AI Error:", err);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Desculpe, tive um erro de conexão. Tente novamente.",
                id: Date.now()
            }]);
        } finally {
            setIsTyping(false);
        }
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

            {/* Input / Preview Area */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="p-4 bg-black/40 border-t border-white/5 relative">
                <AnimatePresence mode="wait">
                    {audioPreviewUrl ? (
                        <motion.div
                            key="audio-preview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center gap-2 w-full"
                        >
                            <div className="flex-grow flex items-center gap-3 bg-brand-accent/5 border border-brand-accent/20 rounded-xl px-4 py-2">
                                <button
                                    type="button"
                                    onClick={togglePreviewPlayback}
                                    className="w-9 h-9 flex items-center justify-center bg-brand-accent text-brand-dark rounded-full shadow-emerald-glow"
                                >
                                    {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" translate="1" />}
                                </button>
                                <div className="flex-grow">
                                    <div className="text-[10px] text-brand-accent font-black uppercase tracking-widest">Preview da voz</div>
                                    <div className="text-[9px] text-white/40 truncate">Pronto para enviar</div>
                                </div>
                                <audio
                                    ref={audioRef}
                                    src={audioPreviewUrl}
                                    onEnded={() => setIsPlaying(false)}
                                    className="hidden"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={discardAudio}
                                className="p-3.5 bg-white/5 border border-white/10 text-white/60 rounded-xl hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 transition-all"
                                title="Descartar"
                            >
                                <Trash2 size={16} />
                            </button>

                            <button
                                type="button"
                                onClick={confirmAudio}
                                className="p-3.5 bg-brand-accent text-brand-dark rounded-xl shadow-emerald-glow hover:scale-105 transition-transform"
                                title="Enviar para IA"
                            >
                                <CheckCircle size={16} />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="normal-input"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative flex items-center gap-2 w-full"
                        >
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
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
};

export default ProposalChat;
