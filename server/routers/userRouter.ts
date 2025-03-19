/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request, Response } from "express";
import User from "../models/user.js";
import { newUser as NewUserType, User as UserType } from "../types/userType.js";

const router: Router = Router();

router.get("/", async (_req: Request, res: Response): Promise<any> => {
  try {
    const users = await User.findAll({});
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const id: string = req.params.id;
    const userToFind = await User.findByPk(id);
    if (userToFind == null) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(userToFind);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

const isEmpty = (obj: NewUserType): boolean => {
  if (Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
};

const isMissing = (obj: NewUserType): boolean => {
  if (!(Object.keys(obj).length === 7)) {
    // comparation with the length of the userType
    return true;
  } else {
    if (
      !(
        Object.keys(obj.address).length === 5 &&
        //Comparation with the length of the address input
        Object.keys(obj.company).length === 3
        //Comparation with the length of the company input
      )
    ) {
      return true;
    } else {
      return false;
    }
  }
};

router.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const userData: NewUserType = req.body;

    if (isEmpty(userData)) {
      return res.status(400).json({ message: "User is empty." });
    }

    if (isMissing(userData)) {
      return res
        .status(400)
        .json({ message: "Invalid body, some key is missing." });
    }
    
    const alreadyExists: User | null = await User.findOne({
      where: userData,
    });

    if (alreadyExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const id: number = await User.max("id");
    const newUser: UserType = { id: id + 1, ...userData };


    await User.create(newUser);
    return res.json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id;
    const userToDelete = await User.findByPk(id);
    if (userToDelete == null) {
      return res.status(404).json({ message: "User not found" });
      return;
    }
    userToDelete.destroy();
    return res.json(userToDelete);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

export default router;
