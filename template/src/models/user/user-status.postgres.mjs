import { DataTypes } from "sequelize";
import { sequelize } from "../../services/postgres.mjs";

const uStatus = sequelize.define("uStatus", {
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
        msg: "Please enter Tcategory name",
      },
    },
  },
  color: DataTypes.STRING(20),
});

export default uStatus;
