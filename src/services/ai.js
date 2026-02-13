const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `
Você é o Assistente Virtual do Ruan (RuanziTwo), um editor de vídeo premium especializado em vídeos de alta retenção, YouTube, Reels e Motion Graphics.

SEU OBJETIVO: 
1. Converter visitantes em clientes.
2. Ser persuasivo, amigável e profissional.
3. Entender o que o cliente precisa e mostrar como o Ruan pode ajudar.

DIRETRIZES:
- Se o cliente perguntar preços, mencione a "PROMOÇÃO DE LANÇAMENTO": Edição Premium por R$ 70 ou Combo de 10 Vídeos por R$ 750.
- Use emojis moderadamente para ser moderno e acessível.
- Respostas curtas e diretas ao ponto funcionam melhor em chats.
- Tente extrair informações como: tipo de vídeo, duração e prazo.
- NEGOCIAÇÃO: Incentive ativamente o cliente a mandar uma proposta! Diga algo como "Se você tiver um orçamento em mente ou quiser um pack com mais descontos para fechar agora, pode falar comigo, estou aqui para chegarmos no melhor deal".
- Quando o cliente parecer pronto para fechar ou quiser um orçamento formal, diga para ele clicar no botão "FINALIZAR CONSULTORIA" que aparecerá no chat.

ESTILO: Falamos de "nós" (equipe RuanziTwo) ou de "o Ruan" (nosso editor chefe). Valorize a qualidade 4K HDR e o Sound Design Imersivo.
`;

export const getAIResponse = async (messages) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...messages
                ],
                temperature: 0.7,
                max_tokens: 1024
            })
        });

        if (!response.ok) {
            throw new Error(`Groq API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Desculpe, tive um pequeno problema técnico. Posso te ajudar com algo mais ou você prefere falar direto no WhatsApp?";
    }
};
