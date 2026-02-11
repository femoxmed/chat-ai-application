export type OpenAISession = { lastResponseId: string | null };
export type OllamaSession = { messages: any[] };

const conversations = new Map<string, OpenAISession | OllamaSession>();

export function createConversation(
   conversationId: string,
   provider: 'openai' | 'ollama'
) {
   if (conversations.has(conversationId)) {
      return conversations.get(conversationId);
   }

   const session =
      provider === 'openai' ? { lastResponseId: null } : { messages: [] };

   conversations.set(conversationId, session);
   return session;
}

export function getConversation(conversationId: string) {
   return conversations.get(conversationId) || null;
}

export function updateConversation(
   conversationId: string,
   session: OpenAISession | OllamaSession
) {
   conversations.set(conversationId, session);
}

export function getLastResponseId(conversationId: string) {
   const session = conversations.get(conversationId);
   if (!session) return null;

   // Only OpenAI sessions have lastResponseId
   if ('lastResponseId' in session) {
      return session.lastResponseId;
   }

   return null;
}

export function getMessages(conversationId: string) {
   const session = conversations.get(conversationId);
   if (!session) return [];

   // Only Ollama sessions have messages
   if ('messages' in session) {
      return session.messages;
   }

   return [];
}

export function getConversations() {
   return conversations;
}
