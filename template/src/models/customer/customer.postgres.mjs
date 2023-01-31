import { DataTypes } from "sequelize";
import { sequelize } from "../../services/postgres.mjs";

const Customer = sequelize.define("Customer", {
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
  status: DataTypes.UUID,
});

export default Customer;
