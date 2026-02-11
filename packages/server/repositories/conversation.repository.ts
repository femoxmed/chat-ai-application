export type OpenAISession = { lastResponseId: string | null };
export type OllamaSession = { messages: any[] };

const conversations = new Map<string, OpenAISession | OllamaSession>();

export const conversationRepository = {
   // Core CRUD operations
   create: function (conversationId: string, provider: 'openai' | 'ollama') {
      if (conversations.has(conversationId)) {
         return conversations.get(conversationId);
      }

      const session =
         provider === 'openai' ? { lastResponseId: null } : { messages: [] };

      conversations.set(conversationId, session);
      return session;
   },

   get: function (conversationId: string) {
      return conversations.get(conversationId) || null;
   },

   update: function (
      conversationId: string,
      session: OpenAISession | OllamaSession
   ) {
      conversations.set(conversationId, session);
   },

   getAll: function () {
      return conversations;
   },

   // Provider-specific operations
   getLastResponseId: function (conversationId: string) {
      const session = conversations.get(conversationId);
      if (!session) return null;

      // Only OpenAI sessions have lastResponseId
      if ('lastResponseId' in session) {
         return session.lastResponseId;
      }

      return null;
   },

   getMessages: function (conversationId: string) {
      const session = conversations.get(conversationId);
      if (!session) return [];

      // Only Ollama sessions have messages
      if ('messages' in session) {
         return session.messages;
      }

      return [];
   },

   // Utility operations
   exists: function (conversationId: string) {
      return conversations.has(conversationId);
   },

   delete: function (conversationId: string) {
      return conversations.delete(conversationId);
   },
};
