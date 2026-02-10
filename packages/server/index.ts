import express, { type Request, type Response } from 'express';

const app = express();
const port = process.env.PORT || 3005;

app.get('/', (req: Request, res: Response) => {
	res.send(process.env.OPENAI_API_KEY);
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
