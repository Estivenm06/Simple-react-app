import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db.ts";

class User extends Model {}

export const user = {
  classUser: User,
  initUser: initUser,
};

async function initUser() {
  await new Promise((resolve) => {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          unique: true
        },
        username: {
          type: DataTypes.STRING,
          unique: true
        },
        email: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.JSONB,
        },
        phone: {
          type: DataTypes.STRING,
        },
        website: {
          type: DataTypes.STRING,
          unique: true
        },
        company: {
          type: DataTypes.JSONB,
          unique: true
        },
      },
      {
        sequelize: sequelize,
        tableName: "users",
        timestamps: false,
      }
    );
    resolve(void 0);
  });
}
