import { isEmpty, isMissing } from "../helpers/utils.js";
import { Request, Response } from "express";
import { User as UserType, NewUser as NewUserType } from "../types/userType.js";
import User from "../models/user.js";

const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getOneUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const userToFind = await User.findByPk(id);
    if (!userToFind) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(userToFind);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData: NewUserType = req.body;

    if (isEmpty(userData)) {
      res.status(400).json({ message: "User is empty." });
      return;
    }

    if (isMissing(userData)) {
      res.status(400).json({ message: "Invalid body, some key is missing." });
      return;
    }

    const alreadyExists = await User.findOne({
      where: userData,
    });

    if (alreadyExists) {
      res.status(400).json({ message: "User already exists." });
      return;
    }

    const id: number = await User.max("id");
    const newUser: UserType = { id: id + 1, ...userData };

    await User.create(newUser);
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const userToDelete = await User.findByPk(id);
    if (!userToDelete) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    userToDelete.destroy();
    res.json(userToDelete);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export { getAllUsers, getOneUser, createUser, deleteUser };
