import path from "path";

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, "src", "config.env"), debug: true });

console.log("NODE_ENV ", process.env.NODE_ENV);
const CONNECTION_URI = process.env.CONNECTION_URI;
console.log("CONNECTION_URI ", CONNECTION_URI);

const sequelize = new Sequelize(CONNECTION_URI);

const postgresConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const disconnect = () => {
  //
};

export { sequelize, postgresConnect };
