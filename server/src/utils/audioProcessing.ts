
import { load } from '@whisper/core';
import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
);

export async function transcribeAudio(audioPath: string): Promise<string> {
  const whisper = await load();
  const result = await whisper.transcribe(audioPath);
  return result.text;
}

export async function analyzeTranscript(transcript: string) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "system",
      content: "Analyze this call transcript and provide: summary, sentiment analysis, script compliance check, and critical language alerts."
    }, {
      role: "user",
      content: transcript
    }]
  });

  return JSON.parse(completion.data.choices[0].message.content);
}
