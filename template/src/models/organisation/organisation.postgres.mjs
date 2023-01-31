import { DataTypes } from "sequelize";
import { sequelize } from "../../services/postgres.mjs";

const organisation = sequelize.define("organisation", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
});

export default organisation;
