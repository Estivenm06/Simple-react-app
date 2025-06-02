import { Sequelize } from "sequelize";
import pg from "pg";
import { SequelizeStorage, Umzug } from "umzug";

const databaseUrl = process.env.DB_URI

if(!databaseUrl){
  console.error("DATABASEURL environment variable is not set!");
  process.exit(1);
}

const sequelize: Sequelize = new Sequelize(databaseUrl,
  {
    dialect: "postgres",
    dialectModule: pg,
  }
);

const runMigration = async (): Promise<void> => {
  const migration = new Umzug({
    migrations: { glob: "./server/migrations/*.ts" },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    logger: console,
  });
  const migrations = await migration.up();
  console.log("Migrations up to date, ", {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDb = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await runMigration();
    console.log("Connection has been establised succcessfully.");
    console.log("Migrations initialized succesfully.");
  } catch (error) {
    console.error("Unable to connect with the database: ", error);
  }
};

export { sequelize, connectToDb };
