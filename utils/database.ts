import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  host: "localhost",
  database: "triveous",
  username: "postgres",
  dialect: "postgres",
});
