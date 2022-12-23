import { DataTypes } from "sequelize";
import { sequelize } from "../../services/postgres.mjs";

const customer = sequelize.define("customer", {
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
        msg: "Please enter tUser name",
      },
    },
  },
  mobile: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter Mobile number",
      },
    },
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter Emial Id",
      },
    },
  },
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

export default customer;
