import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { db } from './src/Config/db.config';
import { router } from './src/Routes/user.routes';
import { router as campaignRoutes } from './src/Routes/campaign.routes';
import { router as submissionRoutes } from './src/Routes/submissions.routes';
import { router as authorRoutes } from './src/Routes/author.routes';
import { router as startUpRoutes } from './src/Routes/startup.routes';
import cors from 'cors'
dotenv.config();
const app: Express = express();
const port = process.env.PORT;
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/user', router)
app.use('/api/v1/campaign', campaignRoutes)
app.use('/api/v1/submissions', submissionRoutes)
app.use('/api/v1/author', authorRoutes)
app.use('/api/v1/startup', startUpRoutes)
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

db.then(() => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
})