import { DataTypes } from "sequelize";
import { sequelize } from "../../services/postgres.mjs";

const Tstatus = sequelize.define("TStatus", {
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
        msg: "Please enter TicketStatus name",
      },
    },
  },
  color: {
    type: DataTypes.STRING(20),

  },
  createdBy: DataTypes.UUID,
 
});

export default Tstatus;
