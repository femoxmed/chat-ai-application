import { ollamaChat } from '../providers/ollama.provider';
import { openaiChat } from '../providers/openai.provider';
import {
   createConversation,
   getConversation,
   type OllamaSession,
   type OpenAISession,
} from '../repositories/conversation.repository';

export async function generateChat(conversationId: string, prompt: string) {
   const provider = process.env.AI_PROVIDER;

   if (provider === 'openai') {
      const session = createConversation(
         conversationId,
         'openai'
      ) as OpenAISession;
      return openaiChat(prompt, session);
   }

   // Ollama
   const session = createConversation(
      conversationId,
      'ollama'
   ) as OllamaSession;
   return ollamaChat(prompt, session);
}
