import { useEffect, useState } from 'react';
import './App.css';
import Chatbox from './components/chat/Chatbox';

function App() {
   const [, setMessage] = useState('');
   useEffect(() => {
      fetch('/api/hello')
         .then((res) => res.json())
         .then((data) => setMessage(data.message));
   });

   return (
      <div>
         <Chatbox />
      </div>
   );
}

export default App;
