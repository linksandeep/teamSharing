import { DataTypes } from "sequelize";
import { sequelize } from "../../services/postgres.mjs";

const tComment = sequelize.define("tComment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  ticketId:DataTypes.UUID,
  content: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter TicketId",
      },
    },
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter CreatedBy",
      },
    },
  },
});

export default tComment;
