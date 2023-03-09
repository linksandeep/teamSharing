import { DataTypes } from "sequelize";
import { sequelize } from "../services/postgres.mjs";

const Events = sequelize.define("Events", {
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
        msg: "Please enter Events name",
      },
    },
  },
  description: DataTypes.STRING(100),
  date: { type: DataTypes.DATEONLY },
  start_time: { type: DataTypes.TIME },
  end_time: { type: DataTypes.TIME },
});

export default Events;
