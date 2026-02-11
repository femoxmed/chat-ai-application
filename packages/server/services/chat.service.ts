import { ollamaChat } from '../providers/ollama.provider';
import { openaiChat } from '../providers/openai.provider';
import {
   conversationRepository,
   type OllamaSession,
   type OpenAISession,
} from '../repositories/conversation.repository';
import type { ChatResponse } from '../util/types';

export const chatService = {
   async sendMessage(conversationId: string, prompt: string): Promise<string> {
      const provider = process.env.AI_PROVIDER;

      if (provider === 'openai') {
         const session = conversationRepository.create(
            conversationId,
            'openai'
         ) as OpenAISession;
         const response = await openaiChat(prompt, session);
         return response.message;
      }

      // Ollama
      const session = conversationRepository.create(
         conversationId,
         'ollama'
      ) as OllamaSession;
      const response = await ollamaChat(prompt, session);
      return response.message;
   },
};
