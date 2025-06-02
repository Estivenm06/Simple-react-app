import 'dotenv/config'
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { connectToDb } from "./utils/db.js";
import userRouter from "./routers/userRouter.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app: Express = express();
const PORT: number | string = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(express.json());
app.use(cors());
app.use("/api/users", userRouter);
app.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..','client', 'dist', 'index.html'))
})

app.listen(PORT, async () => {
  await connectToDb().then(() => {
    console.log(`Server running on http://localhost:${PORT}`);
  }).catch((error) => {
    console.log(`Error trying to running server `, error);
  });
});
