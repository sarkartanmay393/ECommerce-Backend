import { Sequelize } from "sequelize";
import fs from "fs";

export const sequelize = new Sequelize(
  {
    username: 'avnadmin',
    password: '',
    database: 'triveous',
    host: 'pg-1d02b618-sarkartanmay393-034b.a.aivencloud.com',
    port: 14056,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync(__dirname + "/../ca.pem").toString(),
      },
    },
  }
);
