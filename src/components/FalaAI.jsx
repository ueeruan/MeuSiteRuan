import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIResponse, transcribeAudio, AE_EXPERT_PROMPT } from '../services/ai';
import { Send, MessageSquare, CheckCircle, Sparkles, Mic, Square, Play, Pause, Trash2, Terminal, Code, Download, Package } from 'lucide-react';
import JSZip from 'jszip';

const FalaAI = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioPreviewUrl, setAudioPreviewUrl] = useState(null);
    const [recordedBlob, setRecordedBlob] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [extensionData, setExtensionData] = useState(null);
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

    useEffect(scrollToBottom, [messages, isTyping, extensionData]);

    const initChat = async () => {
        setIsTyping(true);
        const welcome = "Fala aí! Sou o especialista em After Effects e automação. Quer validar uma ideia ou **CRIAR UMA EXTENSÃO** agora mesmo? Me conta o que você precisa! 💻📽️";
        setTimeout(() => {
            setMessages([{ role: 'assistant', content: welcome, id: Date.now() }]);
            setIsTyping(false);
        }, 1000);
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
            });
            const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg';
            mediaRecorderRef.current = new MediaRecorder(stream, { mimeType, audioBitsPerSecond: 128000 });
            audioChunksRef.current = [];
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) audioChunksRef.current.push(event.data);
            };
            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
                if (audioBlob.size < 500) {
                    setMessages(prev => [...prev, { role: 'assistant', content: "Ops, não captei seu áudio. Pode repetir?", id: Date.now() }]);
                    return;
                }
                const url = URL.createObjectURL(audioBlob);
                setAudioPreviewUrl(url);
                setRecordedBlob(audioBlob);
            };
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            alert("Erro ao acessar microfone.");
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
        const extension = recordedBlob.type.split('/')[1];
        const blobToSend = recordedBlob;
        discardAudio();
        const transcription = await transcribeAudio(blobToSend, extension);
        if (transcription && transcription.trim().length > 2) {
            handleSend(transcription);
        } else {
            setMessages(prev => [...prev, { role: 'assistant', content: "Não entendi o áudio. Pode tentar novamente?", id: Date.now() }]);
            setIsTyping(false);
        }
    };

    const discardAudio = () => {
        if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
        setAudioPreviewUrl(null);
        setRecordedBlob(null);
        setIsPlaying(false);
    };

    const togglePreviewPlayback = () => {
        if (!audioRef.current) return;
        if (isPlaying) audioRef.current.pause();
        else audioRef.current.play();
        setIsPlaying(!isPlaying);
    };

    const downloadExtension = async () => {
        if (!extensionData) return;
        const zip = new JSZip();
        extensionData.files.forEach(file => {
            zip.file(file.path, file.content);
        });
        const blob = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${extensionData.name.replace(/\s+/g, '_') || "extension"}.zip`;
        a.click();
        URL.revokeObjectURL(url);
        setMessages(prev => [...prev, { role: 'assistant', content: "Download iniciado! Instale via ZXP Installer ou coloque na pasta CEP/extensions. 🚀", id: Date.now() }]);
    };

    const handleSend = async (text) => {
        if (!text.trim() || isFinished) return;
        const val = text.trim();
        const userMsg = { role: 'user', content: val, id: Date.now() };

        // Finalization keywords for AE Expert
        const lowerInput = val.toLowerCase();
        const shouldFinalize =
            lowerInput.includes('enviar para o juan') ||
            lowerInput.includes('enviar para juan') ||
            lowerInput.includes('falar com o juan') ||
            lowerInput.includes('finalizar') ||
            lowerInput.includes('concluir');

        if (shouldFinalize) {
            setMessages(prev => [...prev, userMsg, {
                role: 'assistant',
                content: "Briefing técnico gerado! Vou te levar agora para o WhatsApp do Juan para darmos início ao desenvolvimento dessa ferramenta. 🚀👨‍💻",
                id: Date.now() + 1
            }]);
            setInputValue('');
            setIsTyping(false);
            setTimeout(() => {
                const link = generateWhatsAppLink();
                window.location.href = link;
                setIsFinished(true);
            }, 2500);
            return;
        }

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        const historyForAI = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));

        try {
            const aiResponse = await getAIResponse(historyForAI, AE_EXPERT_PROMPT);

            // Check for Extension JSON
            const jsonMatch = aiResponse.match(/<EXTENSION_JSON>([\s\S]*?)<\/EXTENSION_JSON>/);

            if (jsonMatch && jsonMatch[1]) {
                try {
                    const jsonContent = JSON.parse(jsonMatch[1]);
                    setExtensionData(jsonContent);
                    const cleanResponse = aiResponse.replace(/<EXTENSION_JSON>[\s\S]*?<\/EXTENSION_JSON>/, '').trim();
                    setMessages(prev => [...prev, {
                        role: 'assistant',
                        content: cleanResponse,
                        id: Date.now(),
                        hasDownload: true
                    }]);
                } catch (e) {
                    console.error("JSON Parse Error", e);
                    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse, id: Date.now() }]);
                }
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: aiResponse, id: Date.now() }]);
            }

        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Erro de conexão técnico. Tente novamente.", id: Date.now() }]);
        } finally {
            setIsTyping(false);
        }
    };

    const generateWhatsAppLink = () => {
        const phone = "5588996126717";
        const history = messages.map(m => `*${m.role === 'user' ? 'Ideia' : 'Especialista'}:* ${m.content}`).join('\n\n');
        const message = `*Briefing Técnico AE - FalaAI*\n\n--- DISCUSSÃO ---\n\n${history}\n\n--- FIM ---\n_Enviado pelo FalaAI_`;
        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    };

    return (
        <div className="max-w-xl mx-auto glass-panel rounded-[2rem] overflow-hidden flex flex-col h-[520px] border-blue-500/10 shadow-blue-glow relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-20">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((messages.length / 10) * 100, 100)}%` }}
                    className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-500"
                />
            </div>

            <div className="p-5 border-b border-white/5 bg-white/5 flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <Code size={18} />
                </div>
                <div>
                    <h3 className="font-heading text-xs tracking-widest uppercase">FALA AI - After Effects</h3>
                    <span className="text-[8px] text-blue-400 font-black uppercase tracking-widest animate-pulse">Especialista Online</span>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto p-5 space-y-6 custom-scrollbar">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 15, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                        >
                            <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-lg ${msg.role === 'user'
                                ? 'bg-blue-600 text-white font-bold rounded-tr-none'
                                : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'}`}
                            >
                                {msg.content}
                            </div>

                            {msg.hasDownload && extensionData && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mt-2"
                                >
                                    <button
                                        onClick={downloadExtension}
                                        className="flex items-center gap-3 px-6 py-3 bg-blue-500 text-white rounded-xl shadow-blue-glow hover:scale-105 transition-all group"
                                    >
                                        <Package size={18} />
                                        <div className="text-left">
                                            <div className="text-[10px] uppercase font-black tracking-widest opacity-80">Extensão Pronta</div>
                                            <div className="text-xs font-bold">Baixar {extensionData.name}.zip</div>
                                        </div>
                                        <Download size={16} className="ml-2 group-hover:translate-y-1 transition-transform" />
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-start">
                            <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-3 items-center">
                                <span className="text-[10px] text-blue-400/60 font-bold uppercase tracking-widest">
                                    {isRecording ? "Gravando..." : "Compilando..."}
                                </span>
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-duration:0.6s]" />
                                    <div className="w-1 h-1 bg-blue-500/60 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]" />
                                    <div className="w-1 h-1 bg-blue-500/30 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={chatEndRef} />
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="p-4 bg-black/40 border-t border-white/5 relative">
                <AnimatePresence mode="wait">
                    {audioPreviewUrl ? (
                        <div className="flex items-center gap-2 w-full">
                            <div className="flex-grow flex items-center gap-3 bg-blue-500/5 border border-blue-500/20 rounded-xl px-4 py-2">
                                <button type="button" onClick={togglePreviewPlayback} className="w-9 h-9 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-blue-glow">
                                    {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" translate="1" />}
                                </button>
                                <audio ref={audioRef} src={audioPreviewUrl} onEnded={() => setIsPlaying(false)} className="hidden" />
                                <div className="flex-grow text-[9px] text-white/40">Gravação de voz pronta</div>
                            </div>
                            <button type="button" onClick={discardAudio} className="p-3.5 bg-white/5 border border-white/10 text-white/60 rounded-xl hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                            <button type="button" onClick={confirmAudio} className="p-3.5 bg-blue-500 text-white rounded-xl shadow-blue-glow"><CheckCircle size={16} /></button>
                        </div>
                    ) : (
                        <div className="relative flex items-center gap-2 w-full">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={isFinished ? "Briefing enviado" : (isRecording ? "Captando..." : "Explique sua ideia de ferramenta...")}
                                disabled={isFinished || isTyping || isRecording}
                                className="flex-grow bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-[13px] focus:outline-none focus:border-blue-500/50 text-white"
                            />
                            <button type="submit" disabled={!inputValue.trim() || isTyping || isFinished || isRecording} className="p-3 bg-blue-500 text-white rounded-xl hover:scale-105 transition-all"><Send size={16} /></button>
                            <button type="button" onClick={isRecording ? stopRecording : startRecording} disabled={isTyping} className={`p-3 rounded-xl transition-all ${isRecording ? 'bg-red-500 text-white' : 'bg-blue-500/10 border border-blue-500/20 text-blue-500'}`}>{isRecording ? <Square size={16} fill="currentColor" /> : <Mic size={16} />}</button>
                        </div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
};

export default FalaAI;
