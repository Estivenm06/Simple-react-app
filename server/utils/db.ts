import { Sequelize } from "sequelize";
import pg from "pg";
import { user } from "../models/user.ts";
import axios from "axios";
import { User } from "../types/userType.ts";

export const sequelize: Sequelize = new Sequelize(
  "postgresql://postgres:password@localhost:5432/",
  {
    dialect: "postgres",
    dialectModule: pg,
  }
);

export const connectToDb = async (): Promise<void> => {
  try {
    const userClass = user.classUser;
    await sequelize.authenticate();
    await user.initUser();
    await userClass.sync({ force: true }).then(async () => {
      try {
        console.log("User table created");
        await axios
          .get("https://jsonplaceholder.typicode.com/users")
          .then((response) => {
            response.data.forEach(async (user: User) => {
              await userClass.create(user);
            });
          });
        console.log("Users added to the table");
      } catch (error) {
        console.error("Error creating user table: ", error);
      }
    });
    console.log("Connection has been establised succcessfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
};
