import React from 'react';

export const LoadingIndicator: React.FC = () => {
   return (
      <div className="flex justify-start">
         <div className="bg-white text-gray-800 mr-16 border border-gray-100 max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm">
            <div className="flex space-x-2">
               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
               <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
               ></div>
               <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
               ></div>
            </div>
         </div>
      </div>
   );
};
