import { DataTypes } from "sequelize";
import { sequelize } from "../../services/postgres.mjs";

const TCLogs = sequelize.define("TCLogs", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
 
  updatedBy: DataTypes.UUID
});

export default TCLogs;
