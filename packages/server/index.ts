import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.route';
dotenv.config();

const app = express();
app.use(express.json());
app.use(router);
const port = process.env.PORT || 3005;

app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
});
