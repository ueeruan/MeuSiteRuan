import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

export const config = {
    runtime: 'edge', // Using Edge Runtime for maximum speed like the template
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    try {
        const { messages } = await req.json();
        const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;

        if (!GROQ_API_KEY) {
            return new Response(JSON.stringify({ error: 'Missing API Key' }), { status: 500 });
        }

        // Using the Vercel AI SDK logic
        const { text } = await generateText({
            model: groq('llama-3.3-70b-versatile'),
            messages: messages,
            apiKey: GROQ_API_KEY,
        });

        return new Response(JSON.stringify({ choices: [{ message: { content: text } }] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("SDK Error:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), { status: 500 });
    }
}
