import { DataTypes } from "sequelize";
import { sequelize } from "../../services/postgres.mjs";

const Tcategory = sequelize.define("Tcategory", {
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
        msg: "Please enter name",
      },
    },
  },
  createdBy: DataTypes.UUID,
  updatedBy: DataTypes.UUID
});

export default Tcategory;
