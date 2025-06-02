import axios, { AxiosError } from "axios";
import { NewUser, User } from "../types/userType.js";

export const getAll = async (): Promise<User[]> => {
  const response = await axios.get<User[]>("/api/users");
  return response.data;
};

export const getUser = async (id: string): Promise<User> => {
  const response = await axios.get<User>("/api/users/" + id);
  return response.data;
};

export const createUser = async (
  user: NewUser
): Promise<User | string | void> => {
  try {
    const response = await axios.post<User>("/api/users/", user);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;
      return errorMessage;
    }
  }
};

export const deleteUser = async (id: number): Promise<User> => {
  const response = await axios.delete("/api/users/" + id);
  return response.data;
};
