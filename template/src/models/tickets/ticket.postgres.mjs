import { DataTypes, UUID } from "sequelize";
import { sequelize } from "../../services/postgres.mjs";

const Ticket = sequelize.define("Ticket", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter TicketStatus name",
      },
    },
  },
  ticketCategoryId:DataTypes.UUID,
  description: DataTypes.STRING(100),
  status:DataTypes.UUID,
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter TicketStatus name",
      },
    },
  },
  assignedTo: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter TicketStatus name",
      },
    },
  },
  priorityId:DataTypes.UUID

 
});

export default Ticket;
