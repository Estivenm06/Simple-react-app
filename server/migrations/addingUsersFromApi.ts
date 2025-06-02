import User from "../models/user.js";
import axios from "axios";
import { DataTypes, QueryInterface } from "sequelize";

const up = async ({context: queryInterface,}: { context: QueryInterface; }): Promise<void> => {
  await queryInterface.createTable("users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    company: {
      type: DataTypes.JSONB,
      unique: true,
      allowNull: false,
    },
  });
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    await User.bulkCreate(data);
    console.log("Users added sucessfully.");
  } catch (error) {
    console.log("Error trying to add users ", error);
  }
};

const down = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}): Promise<void> => {
  await queryInterface.dropTable("users");
  try {
    await User.destroy({ where: {} });
    console.log("Users deleted sucessfully.");
  } catch (error) {
    console.log("Error trying to delete users ", error);
  }
};

export { up, down };
