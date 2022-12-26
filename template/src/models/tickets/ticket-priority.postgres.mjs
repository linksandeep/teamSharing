import { DataTypes } from "sequelize";
import { sequelize } from "../../services/postgres.mjs";

const Tpriority = sequelize.define("Tpriority", {
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
        msg: "Please enter Ticket priority name",
      },
    },
  },
  color: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter Tpriority color",
      },
    },
  },
});

export default Tpriority;
