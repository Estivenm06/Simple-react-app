import express, { Express } from "express";
import cors from "cors";
import { connectToDb } from "./utils/db";
import { user } from "./models/user.ts";

const app: Express = express();
const PORT: number = 8000;

app.use(express.json());
app.use(cors());

app.get("/api/users", async (_req, res) => {
  try {
    const users = await user.classUser.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectToDb();
});
