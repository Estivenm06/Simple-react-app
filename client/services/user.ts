import axios from "axios";
import { NewUser, User } from "../types/userType.ts";

export const getAll = async (): Promise<User[]> => {
  const response = await axios.get<User[]>("/api/users");
  return response.data;
};

export const getUser = async (id: string): Promise<User> => {
  const response = await axios.get<User>('/api/users/' + id)
  return response.data;
}

export const createUser = async (user: NewUser): Promise<User> => {
  const response = await axios.post<User>('/api/users/', user)
  console.log(response);
  return response.data;
}

export const deleteUser = async (id: string): Promise<User> => {
  const response = await axios.delete('/api/users/' + id)
  return response.data;
}