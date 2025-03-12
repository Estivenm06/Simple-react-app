import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db.js";

class User extends Model {}

User.init(
  {
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
  },
  {
    sequelize: sequelize,
    tableName: "users",
    timestamps: false,
  }
);

export default User