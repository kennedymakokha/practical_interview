import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app: Express = express();
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const port = process.env.PORT;
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});