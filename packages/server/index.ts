import express from 'express';
import dotenv from 'dotenv';
import { chatController } from './controllers/chat.controller';
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3005;

app.post('/api/chat', chatController.sendMessage);

app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
});
