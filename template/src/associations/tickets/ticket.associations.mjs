import Ticket from "../../models/tickets/ticket.postgres.mjs";
import Tstatus from "../../models/tickets/ticket-status.postgres.mjs";
import Tcategory from "../../models/tickets/ticket-category.postgres.mjs";
import Tpriority from "../../models/tickets/ticket-priority.postgres.mjs";
import Customer from "../../models/customer/customer.postgres.mjs";
import Tuser from "../../models/Tuser/tenant-user.postgres.mjs";
import tComment from "../../models/tickets/ticket-comment.postgres.mjs";


// One-To-Many
Tstatus.hasMany(Ticket, {
    foreignKey: "status",
    sourceKey: "id",
  });
  
 Ticket.belongsTo(Tstatus, {
    foreignKey: "status",
    targetKey: "id",
  });

  Tcategory.hasMany(Ticket,{
    foreignKey:"ticketCategoryId",
    sourceKey:"id"
  })

  Ticket.belongsTo(Tcategory, {
    foreignKey: "ticketCategoryId",
    targetKey: "id",
  });

  Customer.hasMany(Ticket,{
    foreignKey:"createdBy",
    sourceKey:"id"
  })

  Ticket.belongsTo(Customer, {
    foreignKey: "createdBy",
    targetKey: "id",
  });

  Tuser.hasMany(Ticket,{
    foreignKey:"assignedTo",
    sourceKey:"id"
  })

  Ticket.belongsTo(Tuser, {
    foreignKey: "assignedTo",
    targetKey: "id",
  });

  Tpriority.hasMany(Ticket,{
    foreignKey:"priorityId",
    sourceKey:"id"
  });
  Ticket.belongsTo(Tpriority,{
    foreignKey:"priorityId",
    targetKey:"id"
  })

  // tComment.hasOne(Ticket,{
  //   foreignKey:"ticketId",
  //   targetKey:"id"
  // })
  // Ticket.belongsTo(tComment,{
  //   foreignKey:"ticketId",
  //   targetKey:"id"
  // })

  Ticket.hasMany(tComment,{
    foreignKey:"ticketId",
    targetKey:"id"
  })
  tComment.belongsTo(Ticket,{
    foreignKey:"ticketId",
    targetKey:"id"
  })