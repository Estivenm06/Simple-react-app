import axios, { AxiosError } from "axios";
import { NewUser, User } from "../types/userType.js";
axios.defaults.baseURL = 'http://localhost:8000/api';

export const getAll = async (): Promise<User[]> => {
  const response = await axios.get<User[]>("/users");
  return response.data;
};

export const getUser = async (id: string): Promise<User> => {
  const response = await axios.get<User>("/users/" + id);
  return response.data;
};

export const createUser = async (
  user: NewUser
): Promise<User | string | void> => {
  try {
    const response = await axios.post<User>("/users/", user);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;
      return errorMessage;
    }
  }
};

export const deleteUser = async (id: number): Promise<User> => {
  const response = await axios.delete("/users/" + id);
  return response.data;
};
