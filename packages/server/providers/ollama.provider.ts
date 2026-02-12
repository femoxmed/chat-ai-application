import OpenAI from 'openai';
import type { ChatResponse } from '../util/types';

const client = new OpenAI({
   baseURL: process.env.OLLAMA_BASE_URL,
   apiKey: 'ollama',
});

export async function ollamaChat(
   prompt: string,
   session: { messages: OpenAI.Chat.ChatCompletionMessageParam[] }
): Promise<ChatResponse> {
   session.messages.push({ role: 'user', content: prompt });

   const response = await client.chat.completions.create({
      model: 'llama3',
      temperature: 0.2,
      messages: session.messages,
      max_completion_tokens: 100,
   });
   // Add proper null/undefined checks
   if (!response.choices || response.choices.length === 0) {
      throw new Error('No response from AI model');
   }

   const choice = response.choices[0];
   if (!choice || !choice.message || !choice.message.content) {
      throw new Error('Invalid response format from AI model');
   }

   const reply = choice.message.content;

   session.messages.push({ role: 'assistant', content: reply });

   return { id: response.id, message: reply };
}
