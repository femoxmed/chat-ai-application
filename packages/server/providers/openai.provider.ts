import OpenAI from 'openai';

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

export async function openaiChat(
   prompt: string,
   session: { lastResponseId: string | null }
) {
   const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt,
      previous_response_id: session.lastResponseId || undefined,
   });

   session.lastResponseId = response.id;

   return response.output_text;
}
