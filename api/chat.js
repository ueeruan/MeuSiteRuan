export const config = {
    runtime: 'nodejs', // Whisper requires standard Node.js for FormData handling
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;

        // This endpoint will handle both Chat and Transcriptions to centralize key management
        // and resolve CORS/auth issues on Vercel

        const { type } = req.body;

        if (type === 'transcription') {
            // Forwarding transcription is tricky in serverless without local temp files
            // For now, let's focus on fixing the Chat and verify the key
            return res.status(400).json({ error: 'Use direct transcription with proper key' });
        }

        const { messages } = req.body;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: messages,
                temperature: 0.7,
                max_tokens: 1024
            })
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
