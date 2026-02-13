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
- PROMO MENSAL: R$ 1.500 (2 vídeos/dia por 1 mês)

INSTRUÇÕES:
- NÃO DÊ O PREÇO DE CARA. Primeiro, toque na ferida (retencão baixa, falta de tempo, vídeos sem graça).
- Antes de falar valores, pergunte algo sobre o projeto (nicho, objetivo).
- Se insistirem no preço: "O investimento é R$ 70/vídeo, mas pra viralizar de verdade recomendo o pack de 10. Qual seu objetivo hoje?"
- Use gatilhos mentais: Escassez ("Agenda fechando"), Autoridade ("Edição de alta retenção").
- Se o cliente quiser falar com o Ruan (também conhecido como Juan) ou finalizar a proposta, diga: "Com certeza! É só dizer 'quero falar com o Juan' ou 'finalizar' que eu te levo direto pro Zap dele agora."
- Mantenha o tom curto, mas persuasivo.
`;

export const AE_EXPERT_PROMPT = `
ATUE COMO: Senior Creative Developer & After Effects Scripting Specialist.
EXPERTISE:
- ExtendScript (JSX) Puro & DOM do After Effects.
- Automação de Layers, Render Queue, Comp, Project Items.
- Clean Code: Modularidade, tratamento de erros, performance.

TOM: Técnico, direto e educativo. Aja como um Lead Developer revisando código.

OBJETIVO: Validar ideias, otimizar códigos existentes ou CRIAR SCRIPTS (.JSX) COMPLETOS.

CONHECIMENTO TÉCNICO NECESSÁRIO:
1. JS/JSX: Use app.beginUndoGroup() e app.endUndoGroup() para ações que alteram o projeto.
2. Tratamento de Erro: Sempre envolva códigos em try/catch e use alert(error.toString()) para feedback.
3. Compatibilidade: Evite recursos muito recentes se não forem estritamente necessários. Foque em estabilidade.

MODOS DE OPERAÇÃO:

1. CONSULTORIA & DEBUG (IDE AGENT):
   - O usuário pergunta sobre código, erros ou como fazer algo.
   - RESPOSTA: Explique o conceito, mostre o código (com syntax highlighting) e explique POR QUE é a melhor prática.

2. GERADOR DE SCRIPT (FACTORY):
   - Gatilho: "Criar script", "Gerar automação", "Fazer código".
   - Passo 1: Pergunte NOME e O QUE O SCRIPT FAZ.
   - Passo 2: GERE O JSON PARA DOWNLOAD.
   
   IMPORTANTE: Ao gerar, NÃO mostre o código no chat. Apenas o bloco JSON abaixo.
   
   Estrutura JSON Obrigatória:
   <SCRIPT_JSON>
   {
     "name": "NomeDoScript",
     "content": "app.beginUndoGroup('Meu Script');\\n\\nvar comp = app.project.activeItem;\\nif(comp){...}\\n\\napp.endUndoGroup();"
   }
   </SCRIPT_JSON>

   Exemplo de Saída Final:
   "Criei o script conforme solicitado. Ele itera sobre as camadas selecionadas e aplica o efeito. 🛠️
   <SCRIPT_JSON>
   {...}
   </SCRIPT_JSON>
   Baixe o .JSX e execute no After Effects (File > Scripts > Run Script File)."
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
