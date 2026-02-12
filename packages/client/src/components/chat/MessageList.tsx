import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { LoadingIndicator } from './LoadingIndicator';

interface Message {
   id: number;
   text: string;
   isUser: boolean;
}

interface MessageListProps {
   messages: Message[];
   isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
   messages,
   isLoading,
}) => {
   const messagesEndRef = useRef<HTMLDivElement>(null);
   const scrollContainerRef = useRef<HTMLDivElement>(null);

   // Auto-scroll to bottom when messages change
   useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      // Check if user is near the bottom (within 100px)
      const isNearBottom =
         scrollContainer.scrollHeight -
            scrollContainer.scrollTop -
            scrollContainer.clientHeight <
         100;

      // Only auto-scroll if user is near the bottom or if it's a new message
      if (isNearBottom || messages.length > 1) {
         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
   }, [messages]);

   return (
      <div
         ref={scrollContainerRef}
         className="flex-1 overflow-y-auto p-6 space-y-4"
      >
         {messages.length === 0 && (
            <div className="text-center py-12">
               <div className="text-gray-400 mb-4">
                  <svg
                     className="w-16 h-16 mx-auto"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                     />
                  </svg>
               </div>
               <p className="text-gray-500 text-lg">
                  Start a conversation with our AI assistant
               </p>
            </div>
         )}

         {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
         ))}

         {isLoading && <LoadingIndicator />}
         <div ref={messagesEndRef} />
      </div>
   );
};
