const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `
ATUE COMO: Braço direito do editor Ruan (RuanziTwo).
TOM: Curto, direto, humano, estilo WhatsApp. Zero enrolação.
REGRA DE OURO: Responda sempre em até 3 frases curtas.

SEUS PREÇOS (Lançamento):
- Unitário: R$ 70
- Pack 5 vídeos: R$ 500
- Pack 10 vídeos: R$ 750

INSTRUÇÕES:
- NÃO DÊ O PREÇO DE CARA. Primeiro, toque na ferida (retencão baixa, falta de tempo, vídeos sem graça).
- Antes de falar valores, pergunte algo sobre o projeto (nicho, objetivo).
- Se insistirem no preço: "O investimento é R$ 70/vídeo, mas pra viralizar de verdade recomendo o pack de 10. Qual seu objetivo hoje?"
- Use gatilhos mentais: Escassez ("Agenda fechando"), Autoridade ("Edição de alta retenção").
- Se o cliente quiser falar com o Ruan (também conhecido como Juan) ou finalizar a proposta, diga: "Com certeza! É só dizer 'quero falar com o Juan' ou 'finalizar' que eu te levo direto pro Zap dele agora."
- Mantenha o tom curto, mas persuasivo.
`;

export const AE_EXPERT_PROMPT = `
ATUE COMO: Especialista em After Effects e Desenvolvedor de Extensões (CEP/ExtendScript).
TOM: Técnico, direto e inovador. Estilo desenvolvedor sênior.
OBJETIVO: Validar ideias de extensões e ferramentas para After Effects.

INSTRUÇÕES:
- Pergunte detalhes da ideia: "O que ela automatiza?", "Como seria o fluxo?".
- Diga o que dá pra fazer via ExtendScript e o que é impossível.
- Se a ideia for boa, diga: "Diga 'enviar para o Juan' que eu mando o briefing técnico direto pra ele."
- Máximo 3 frases por resposta.
`;

export const getAIResponse = async (messages, systemPrompt = SYSTEM_PROMPT) => {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: "system", content: systemPrompt },
                    ...messages
                ]
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || `Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Desculpe, tive um pequeno problema técnico. Posso te ajudar com algo mais ou você prefere falar direto no WhatsApp?";
    }
};

export const transcribeAudio = async (audioBlob, extension = 'webm') => {
    try {
        const formData = new FormData();
        const cleanExt = extension.split(';')[0];
        formData.append('file', audioBlob, `recording.${cleanExt}`);

        const response = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || `Groq Whisper Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.text;
    } catch (error) {
        console.error("Error transcribing audio:", error);
        return null;
    }
};
