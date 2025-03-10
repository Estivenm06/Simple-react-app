import express, { Express } from "express";
import cors from "cors";
import { connectToDb } from "./utils/db";
import userRouter from './routers/userRouter.ts'

const app: Express = express();
const PORT: number = 8000;

app.use(express.json());
app.use(cors());
app.use('/api/users', userRouter)

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectToDb();
});
