import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import { generateChat } from './services/ai.service';
import z from 'zod';
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3005;

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt is too long, max 1000 characters'),
   conversationId: z.uuid(),
});

app.post('/api/chat', async (req: Request, res: Response) => {
   try {
      const parseResult = chatSchema.safeParse(req.body);
      if (!parseResult.success) {
         res.status(400).json(z.treeifyError(parseResult.error));
         return;
      }
      const { prompt, conversationId } = req.body;

      if (!conversationId) {
         return res.status(400).json({ error: 'conversationId is required' });
      }

      const reply = await generateChat(conversationId, prompt);

      res.json({ message: reply });
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'AI request failed' });
   }
});

app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
});
