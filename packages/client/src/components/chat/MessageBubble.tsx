import React from 'react';
import ReactMarkDown from 'react-markdown';
interface Message {
   id: number;
   text: string;
   isUser: boolean;
}

interface MessageBubbleProps {
   message: Message;
}
const onCopy = (e: React.ClipboardEvent<HTMLDivElement>) => {
   const selection = window.getSelection()?.toString().trim();
   if (selection) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', selection);
   }
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
   return (
      <div
         onCopy={onCopy}
         className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
      >
         <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
               message.isUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
            }`}
         >
            <p className="text-sm">
               <ReactMarkDown>{message.text}</ReactMarkDown>
            </p>
         </div>
      </div>
   );
};
