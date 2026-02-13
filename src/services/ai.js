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
OBJETIVO: Validar ideias de extensões ou CRIAR CÓDIGO FINAL para elas.

MODOS:
1. CONSULTORIA: O usuário tem uma dúvida ou quer validar uma ideia.
   - Ação: Analise a viabilidade, sugira melhorias.
   - Finalização: Se ele quiser encomendar, peça para falar "enviar para o Juan".

2. GERADOR (NOVO): O usuário quer criar a extensão AGORA.
   - Gatilho: Usuário diz "criar extensão", "gerar código", "fazer plugin".
   - Passo 1: Pergunte o NOME da extensão e o que ela faz (resumo).
   - Passo 2: Pergunte a VERSÃO do After Effects alvo (ex: 2024, 2025).
   - Passo 3: GERE O JSON COM OS ARQUIVOS BASEADOS NOS SAMPLES OFICIAIS DA ADOBE CEP.
   
   IMPORTANTE: Quando tiver todas as informações, NÃO mostre o código no chat.
   APENAS gere um bloco JSON minificado dentro das tags <EXTENSION_JSON> e </EXTENSION_JSON>.
   
   Estrutura Obrigatória do JSON:
   {
     "name": "NomeDaExtensao",
     "files": [
       { "path": "CSXS/manifest.xml", "content": "XML completo com BundleId, HostList, etc" },
       { "path": "index.html", "content": "HTML5 com CSInterface.js incluso (simulado) e UI básica" },
       { "path": "js/main.js", "content": "Lógica JS para comunicar com JSX" },
       { "path": "jsx/hostscript.jsx", "content": "Funções ExtendScript para controlar o AE" },
       { "path": ".debug", "content": "Configuração de debug porta 7777" }
     ]
   }

   Exemplo de Resposta Final:
   "Tudo pronto! Compilei sua extensão baseada nos padrões Adobe. 🛠️
   <EXTENSION_JSON>
   {...}
   </EXTENSION_JSON>
   Baixe o ZIP abaixo e instale na pasta extensions. 📦"
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
