import React from 'react';

interface Message {
   id: number;
   text: string;
   isUser: boolean;
}

interface MessageBubbleProps {
   message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
   return (
      <div
         className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
      >
         <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
               message.isUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
            }`}
         >
            <p className="text-sm">{message.text}</p>
         </div>
      </div>
   );
};
