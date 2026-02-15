import { useState, useRef } from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import PopSound from '@/assets/sounds/pop.mp3';
import NotificationSound from '@/assets/sounds/notification.mp3';

const popAudio = new Audio(PopSound);
popAudio.volume = 0.2;

const notificationAudio = new Audio(NotificationSound);
notificationAudio.volume = 0.2;

interface Message {
   id: number;
   text: string;
   isUser: boolean;
}

export default function Chatbox() {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isLoading, setIsLoading] = useState(false);

   const conversationIdRef = useRef<string>('');

   if (!conversationIdRef.current) {
      conversationIdRef.current = crypto.randomUUID();
   }

   const handleSubmit = async (message: string) => {
      if (!message.trim() || isLoading) return;

      const userMessage: Message = {
         id: Date.now(),
         text: message,
         isUser: true,
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      popAudio.play();
      try {
         const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               prompt: message,
               conversationId: conversationIdRef.current,
            }),
         });

         const data = await response.json();
         console.log('response', data);
         const aiMessage: Message = {
            id: Date.now() + 1,
            text: data.message,
            isUser: false,
         };
         notificationAudio.play();
         setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
         console.error('Error:', error);
         const errorMessage: Message = {
            id: Date.now() + 1,
            text: 'Sorry, something went wrong. Please try again.',
            isUser: false,
         };
         setMessages((prev) => [...prev, errorMessage]);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="flex flex-col h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
         <ChatHeader />
         <MessageList messages={messages} isLoading={isLoading} />
         <ChatInput isLoading={isLoading} onSendMessage={handleSubmit} />
      </div>
   );
}
