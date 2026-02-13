const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `
ATUE COMO: Braço direito do editor Ruan (RuanziTwo).
TOM: Curto, direto, humano, estilo WhatsApp. Zero enrolação.
REGRA DE OURO: Responda sempre em até 3 frases curtas.

SEUS PREÇOS (Lançamento):
- Unitário: R$ 70
- Pack 10 vídeos: R$ 750

INSTRUÇÕES:
- NÃO DÊ O PREÇO DE CARA. Primeiro, toque na ferida (retencão baixa, falta de tempo, vídeos sem graça).
- Antes de falar valores, pergunte algo sobre o projeto (nicho, objetivo).
- Se insistirem no preço: "O investimento é R$ 70/vídeo, mas pra viralizar de verdade recomendo o pack de 10. Qual seu objetivo hoje?"
- Use gatilhos mentais: Escassez ("Agenda fechando"), Autoridade ("Edição de alta retenção").
- Mantenha o tom curto, mas persuasivo.
`;

export const getAIResponse = async (messages) => {
    try {
        // Detect if we are on Vercel or local
        const isVercel = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
        const API_ENDPOINT = isVercel ? '/api/chat' : API_URL;

        const headers = { 'Content-Type': 'application/json' };
        if (!isVercel) {
            headers['Authorization'] = `Bearer ${GROQ_API_KEY}`;
        }

        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...messages
                ]
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || `Error: ${response.statusText}`);
        }

        const data = await response.json();
        // Handle both direct Groq response and our local API response format
        return isVercel ? data.choices[0].message.content : data.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Desculpe, tive um pequeno problema técnico. Posso te ajudar com algo mais ou você prefere falar direto no WhatsApp?";
    }
};

export const transcribeAudio = async (audioBlob, extension = 'webm') => {
    try {
        const formData = new FormData();
        // Ensure clean extension (remove codec info)
        const cleanExt = extension.split(';')[0];
        formData.append('file', audioBlob, `recording.${cleanExt}`);
        formData.append('model', 'whisper-large-v3-turbo');
        formData.append('response_format', 'json');
        formData.append('language', 'pt');
        formData.append('prompt', 'Conversa sobre edição de vídeos, orçamentos, reels e motion graphics com o editor Ruan.');

        const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Groq Whisper Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.text;
    } catch (error) {
        console.error("Error transcribing audio:", error);
        return null;
    }
};
