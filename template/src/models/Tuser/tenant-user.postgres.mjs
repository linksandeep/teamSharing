import { DataTypes } from "sequelize";
import { sequelize } from "../../services/postgres.mjs";

const tUser = sequelize.define("tUser", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: DataTypes.STRING(20),
  mobile: DataTypes.BIGINT,
  email: DataTypes.STRING(30),
  db: DataTypes.STRING(20),
  address: DataTypes.STRING(200),
  status: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter UUId ",
      },
    },
  },
});

export default tUser;
