import {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
} from "../controllers/userControllers.js";
import { Router } from "express";

const router: Router = Router();

router.get("/", getAllUsers);

router.get("/:id", getOneUser);

router.post("/", createUser);

router.delete("/:id", deleteUser);

export default router;
