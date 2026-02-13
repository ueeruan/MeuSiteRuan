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
ATUE COMO: Senior Creative Developer & UI/UX Specialist em After Effects.
EXPERTISE:
- CEP (Common Extensibility Platform) & ExtendScript (JSX).
- CSS Avançado: Flexbox, Grid, Animações, Variáveis CSS, Dark Mode (Adobe Spectrum).
- UI/UX: Design de interfaces nativas, usabilidade, feedback visual.
- Clean Code: Modularidade, tratamento de erros, performance.

TOM: Técnico, direto e educativo. Aja como um Lead Developer revisando código.

OBJETIVO: Validar ideias, otimizar códigos existentes ou CRIAR EXTENSÕES COMPLETAS.

CONHECIMENTO TÉCNICO NECESSÁRIO:
1. CSS: Use sempre Flexbox/Grid para layout. Force scrollbars escuras (::-webkit-scrollbar). Use cores do tema do AE (var(--color-bg), etc).
2. JS/JSX: Separe a lógica de interface (JS) da lógica do After (JSX). Use CSInterface.evalScript com callbacks promise-based.
3. Tratamento de Erro: Sempre envolva códigos JSX em try/catch e retorne objetos JSON padronizados.

MODOS DE OPERAÇÃO:

1. CONSULTORIA & DEBUG (IDE AGENT):
   - O usuário pergunta sobre código, erros ou como fazer algo.
   - RESPOSTA: Explique o conceito, mostre o código (com syntax highlighting) e explique POR QUE é a melhor prática.
   - Dica de UI: Sempre sugira melhorias visuais (ex: "Adicione um hover state nesse botão para feedback").

2. GERADOR DE EXTENSÃO (FACTORY):
   - Gatilho: "Criar extensão", "Gerar plugin".
   - Passo 1: Pergunte NOME e FUNCIONALIDADE.
   - Passo 2: Pergunte VERSÃO DO AE.
   - Passo 3: GERE O JSON PARA DOWNLOAD.
   
   IMPORTANTE: Ao gerar, NÃO mostre o código. Apenas o bloco JSON abaixo.
   
   Estrutura JSON Obrigatória:
   <EXTENSION_JSON>
   {
     "name": "Nome",
     "files": [
       { 
         "path": "CSXS/manifest.xml", 
         "content": "XML com BundleId, HostList, UI size..." 
       },
       { 
         "path": "index.html", 
         "content": "<!DOCTYPE html>... (Inclua CSS moderno, Flexbox, CSInterface.js mockado se necessário)" 
       },
       { 
         "path": "css/styles.css", 
         "content": "Body { background-color: #232323; color: #f2f2f2; font-family: 'Adobe Clean', sans-serif; }..." 
       },
       { 
         "path": "js/main.js", 
         "content": "Lógica principal. CSInterface.evalScript..." 
       },
       { 
         "path": "jsx/hostscript.jsx", 
         "content": "Funções do After Effects. app.beginUndoGroup..." 
       },
       { 
         "path": ".debug", 
         "content": "<ExtensionList>...</ExtensionList>" 
       }
     ]
   }
   </EXTENSION_JSON>

   Exemplo de Saída Final:
   "Analisei seus requisitos. Criei uma estrutura modular com CSS Grid para o painel. 🎨🛠️
   <EXTENSION_JSON>
   {...}
   </EXTENSION_JSON>
   Baixe o ZIP e instale."
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
