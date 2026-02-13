import formidable from 'formidable';
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const form = formidable();

    try {
        const [fields, files] = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                resolve([fields, files]);
            });
        });

        const audioFile = files.file[0];
        const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;

        const formData = new FormData();
        formData.append('file', fs.createReadStream(audioFile.filepath), {
            filename: audioFile.originalFilename,
            contentType: audioFile.mimetype,
        });
        formData.append('model', 'whisper-large-v3-turbo');
        formData.append('response_format', 'json');
        formData.append('language', 'pt');

        const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                ...formData.getHeaders(),
            },
            body: formData,
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Transcription Proxy Error:", error);
        res.status(500).json({ error: error.message });
    }
}
