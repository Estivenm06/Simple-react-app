import axios from "axios";
import { User } from "../types/userType.ts";

export const getUser = async () => {
  const response = await axios.get<User[]>("/api/users");
  return response.data;
};
