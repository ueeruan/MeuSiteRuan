import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIResponse, transcribeAudio, AE_EXPERT_PROMPT } from '../services/ai';
import { Send, MessageSquare, CheckCircle, Sparkles, Mic, Square, Play, Pause, Trash2, Terminal, Code, Download, Package, FileCode, Monitor, ChevronRight, Image as ImageIcon } from 'lucide-react';
import JSZip from 'jszip';

// --- Simple Syntax Highlighter ---
const CodeBlock = ({ code, language }) => {
    // Basic syntax highlighting logic
    const highlight = (text) => {
        if (!text) return "";
        let html = text
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/(".*?")/g, '<span class="text-green-400">$1</span>')
            .replace(/\b(const|let|var|function|return|if|else|for|while|import|export|from|async|await|try|catch|new|this|class)\b/g, '<span class="text-purple-400 font-bold">$1</span>')
            .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-orange-400">$1</span>')
            .replace(/\b(console|document|window|Math|JSON|navigator|alert)\b/g, '<span class="text-yellow-400">$1</span>')
            .replace(/\/\/.*$/gm, '<span class="text-gray-500 italic">$&</span>'); // Comments
        return html;
    };

    return (
        <pre className="font-mono text-[11px] leading-relaxed p-4 bg-[#0d1117] text-gray-300 overflow-auto h-full custom-scrollbar">
            <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
        </pre>
    );
};

const FalaAI = () => {
    // Chat State
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    // Audio State
    const [isRecording, setIsRecording] = useState(false);
    const [audioPreviewUrl, setAudioPreviewUrl] = useState(null);
    const [recordedBlob, setRecordedBlob] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // IDE State
    const [extensionData, setExtensionData] = useState(null);
    const [activeFile, setActiveFile] = useState(null);
    const [showPreview, setShowPreview] = useState(true); // Toggle between Code/Preview if needed

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

    // Set initial active file when extension data loads
    useEffect(() => {
        if (extensionData && extensionData.files && extensionData.files.length > 0) {
            setActiveFile(extensionData.files[0]);
        }
    }, [extensionData]);

    const initChat = async () => {
        setIsTyping(true);
        const welcome = "Dev Mode Ativado. 💻\nSou seu **Engenheiro de Extensões**. Posso criar painéis CEP, scripts JSX ou tirar dúvidas de CSS/UI.\n\nO que vamos codar hoje?";
        setTimeout(() => {
            setMessages([{ role: 'assistant', content: welcome, id: Date.now() }]);
            setIsTyping(false);
        }, 1000);
    };

    // --- Audio Logic (Preserved) ---
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
            const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg';
            mediaRecorderRef.current = new MediaRecorder(stream, { mimeType, audioBitsPerSecond: 128000 });
            audioChunksRef.current = [];
            mediaRecorderRef.current.ondataavailable = (event) => { if (event.data.size > 0) audioChunksRef.current.push(event.data); };
            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
                if (audioBlob.size < 500) return;
                setAudioPreviewUrl(URL.createObjectURL(audioBlob));
                setRecordedBlob(audioBlob);
            };
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) { alert("Erro no microfone."); }
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
        if (transcription && transcription.trim().length > 2) handleSend(transcription);
        else {
            setMessages(prev => [...prev, { role: 'assistant', content: "Não entendi, tente novamente.", id: Date.now() }]);
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

    // --- Core Logic ---
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
    };

    const handleSend = async (text) => {
        if (!text.trim() || isFinished) return;
        const val = text.trim();
        const userMsg = { role: 'user', content: val, id: Date.now() };

        // Check for Consultancy Handoff
        const lowerInput = val.toLowerCase();
        const shouldFinalize =
            lowerInput.includes('enviar para o juan') ||
            lowerInput.includes('finalizar') ||
            lowerInput.includes('falar com o juan');

        if (shouldFinalize) {
            setMessages(prev => [...prev, userMsg, {
                role: 'assistant',
                content: "Entendido! Gerando o briefing técnico e te encaminhando para o WhatsApp do Juan... 🚀👨‍💻",
                id: Date.now() + 1
            }]);
            setInputValue('');
            setIsTyping(false);
            setTimeout(() => {
                const phone = "5588996126717";
                const history = [...messages, userMsg].map(m => `*${m.role === 'user' ? 'Ideia' : 'AI'}:* ${m.content}`).join('\n\n');
                const message = `*Briefing Técnico (via FalaAI IDE)*\n\n${history}\n\n_Enviado pelo Agente_`;
                window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
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
                    setMessages(prev => [...prev, { role: 'assistant', content: "Erro ao gerar código.", id: Date.now() }]);
                }
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: aiResponse, id: Date.now() }]);
            }
        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Erro de conexão.", id: Date.now() }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="w-full h-full glass-panel rounded-[2rem] overflow-hidden flex flex-col lg:flex-row border-blue-500/10 shadow-blue-glow relative">

            {/* --- LEFT PANEL: CHAT (35%) --- */}
            <div className="w-full lg:w-[35%] flex flex-col border-r border-white/5 bg-[#0d1117]/50 lg:h-full h-1/2">
                {/* Chat Header */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <Terminal size={16} />
                        </div>
                        <span className="text-xs font-bold tracking-widest text-white/80">CHAT LOG</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                        >
                            <div className={`max-w-[90%] p-3 rounded-xl text-[12px] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-[#161b22] border border-white/5 text-gray-300'}`}>
                                <code dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>') }} />
                            </div>

                            {msg.hasDownload && extensionData && (
                                <button
                                    onClick={downloadExtension}
                                    className="mt-2 text-[10px] flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    <Package size={12} /> Baixar .ZIP
                                </button>
                            )}
                        </motion.div>
                    ))}
                    {isTyping && <div className="text-[10px] text-gray-500 animate-pulse pl-2">AI is coding...</div>}
                    <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="p-3 border-t border-white/5 bg-[#0d1117]">
                    <AnimatePresence mode="wait">
                        {audioPreviewUrl ? (
                            <div className="flex items-center gap-2 bg-blue-500/5 border border-blue-500/20 rounded-lg p-2">
                                <button type="button" onClick={togglePreviewPlayback} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-full">
                                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                                </button>
                                <audio ref={audioRef} src={audioPreviewUrl} onEnded={() => setIsPlaying(false)} className="hidden" />
                                <div className="flex-grow text-[10px] text-blue-300">Gravação pronta</div>
                                <button type="button" onClick={discardAudio} className="p-2 text-red-400 hover:bg-red-500/10 rounded-full"><Trash2 size={14} /></button>
                                <button type="button" onClick={confirmAudio} className="p-2 text-green-400 hover:bg-green-500/10 rounded-full"><CheckCircle size={14} /></button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Comando..."
                                    className="flex-grow bg-[#161b22] border border-white/5 rounded-lg py-2.5 px-3 text-[12px] text-gray-300 focus:outline-none focus:border-blue-500/50 font-mono"
                                    disabled={isTyping || isRecording}
                                />
                                <button type="submit" disabled={!inputValue.trim()} className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"><Send size={14} /></button>
                                <button type="button" onClick={isRecording ? stopRecording : startRecording} className={`p-2.5 rounded-lg transition-colors ${isRecording ? 'bg-red-500/20 text-red-500' : 'bg-[#161b22] text-gray-400 hover:text-white'}`}>{isRecording ? <Square size={14} fill="currentColor" /> : <Mic size={14} />}</button>
                            </div>
                        )}
                    </AnimatePresence>
                </form>
            </div>

            {/* --- RIGHT PANEL: PREVIEW (65%) --- */}
            <div className="w-full lg:w-[65%] flex flex-col bg-[#0d1117] lg:h-full h-1/2 relative">
                {!extensionData ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-30">
                        <Monitor size={48} className="text-blue-500 mb-4" />
                        <p className="text-white font-mono text-sm">AGUARDANDO PROJETO...</p>
                    </div>
                ) : (
                    <>
                        {/* File Tabs */}
                        <div className="flex items-center overflow-x-auto border-b border-white/5 bg-[#010409]">
                            {extensionData.files.map((file, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveFile(file)}
                                    className={`px-4 py-3 flex items-center gap-2 text-[11px] font-mono border-r border-white/5 transition-colors whitespace-nowrap
                                        ${activeFile?.path === file.path ? 'bg-[#0d1117] text-blue-400 border-t-2 border-t-blue-500' : 'text-gray-500 hover:text-gray-300 hover:bg-[#161b22]'}
                                    `}
                                >
                                    <FileCode size={12} />
                                    {file.path}
                                </button>
                            ))}
                        </div>

                        {/* Code Editor Area */}
                        <div className="flex-grow relative bg-[#0d1117]">
                            {activeFile ? (
                                <CodeBlock code={activeFile.content} />
                            ) : (
                                <div className="p-10 text-center text-gray-500 text-sm">Selecione um arquivo para visualizar</div>
                            )}
                        </div>

                        {/* Action Bar */}
                        <div className="p-4 border-t border-white/5 bg-[#161b22] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="text-xs text-gray-400 font-mono">
                                    <span className="text-blue-500 text-[10px]">PROJECT:</span> {extensionData.name}
                                </div>
                                <div className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                    READY
                                </div>
                            </div>
                            <button
                                onClick={downloadExtension}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold tracking-wide transition-all shadow-lg hover:shadow-blue-500/20"
                            >
                                <Download size={14} /> DOWNLOAD ZIP
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FalaAI;
