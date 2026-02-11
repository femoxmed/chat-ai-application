import OpenAI from 'openai';
import type { ChatResponse } from '../util/types';

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

export async function openaiChat(
   prompt: string,
   session: { lastResponseId: string | null }
): Promise<ChatResponse> {
   const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt,
      previous_response_id: session.lastResponseId || undefined,
   });

   session.lastResponseId = response.id;

   return { id: response.id, message: response.output_text };
}
