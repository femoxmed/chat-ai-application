import React from 'react';

export const ChatHeader: React.FC = () => {
   return (
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
               <span className="text-white font-semibold text-sm">AI</span>
            </div>
            <div>
               <h1 className="text-lg font-semibold text-gray-900">
                  AI Assistant
               </h1>
               <p className="text-sm text-gray-500">
                  How can I help you today?
               </p>
            </div>
            <div className="ml-auto">
               <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg animate-pulse"></div>
            </div>
         </div>
      </div>
   );
};
