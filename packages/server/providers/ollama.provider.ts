import OpenAI from 'openai';

const client = new OpenAI({
   baseURL: process.env.OLLAMA_BASE_URL,
   apiKey: 'ollama',
});

export async function ollamaChat(
   prompt: string,
   session: { messages: OpenAI.Chat.ChatCompletionMessageParam[] }
) {
   session.messages.push({ role: 'user', content: prompt });

   const response = await client.chat.completions.create({
      model: 'llama3',
      messages: session.messages,
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

   return reply;
}
