import { DataTypes } from "sequelize";
import { sequelize } from "../../services/postgres.mjs";

const Test = sequelize.define("Test", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter test name",
      },
    },
  },
  description: DataTypes.STRING(100),
});

export default Test;
