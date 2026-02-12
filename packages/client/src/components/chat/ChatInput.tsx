import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';

interface ChatInputProps {
   isLoading: boolean;
   onSendMessage: (message: string) => void;
}

interface FormData {
   message: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
   isLoading,
   onSendMessage,
}) => {
   const {
      register,
      handleSubmit,
      // setValue,
      formState: { errors, isValid },
      reset,
   } = useForm<FormData>({
      defaultValues: {
         message: '',
      },
   });

   const onSubmit = (data: FormData) => {
      console.log(data);
      onSendMessage(data.message);
      reset();
   };
   const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };
   return (
      <div className="bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
         <form
            onKeyDown={onKeyDown}
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-3"
         >
            <div className="relative flex-1">
               <textarea
                  {...register('message', {
                     required: 'Message is required',
                     minLength: {
                        value: 1,
                        message: 'Message cannot be empty',
                     },
                  })}
                  placeholder="Type your message here..."
                  disabled={isLoading}
                  className={`w-full pl-12 pr-16 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed ${
                     errors.message ? 'border-red-500 ring-red-200' : ''
                  }`}
               />
               <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                     className="w-5 h-5"
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
               <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                     className="w-5 h-5"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                     />
                  </svg>
               </div>
            </div>
            {errors.message && (
               <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
               </p>
            )}
            <Button
               type="submit"
               disabled={isLoading || !isValid}
               className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
               {isLoading ? (
                  <div className="flex items-center gap-2">
                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                     <span>Sending...</span>
                  </div>
               ) : (
                  <div className="flex items-center gap-2">
                     <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                     </svg>
                     <span>Send</span>
                  </div>
               )}
            </Button>
         </form>
         <div className="mt-2 text-xs text-gray-400 text-center">
            Press Enter to send • AI responses may take a moment
         </div>
      </div>
   );
};
