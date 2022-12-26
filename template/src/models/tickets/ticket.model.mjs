import ticket from "./ticket.postgres.mjs";

const createTicket = async (data, transaction) => {
  return await ticket.create(data, { transaction });
};

const findAllTicket = async (obj, transaction) => {
  console.log(obj, "<<<<<<>>>>>>>>>>>>>>>>>>>>>>>.....>>>>>>>>>");
  if (obj) {
    const data = await ticket.findAll({ where:  obj, transaction  });
    return data;
  }
  return await Tstatus.findAll({ transaction });
};

const updateTicket = async (ticketId, data, transaction) => {
  let findData = await ticket.findOne({ where: { id: ticketId } }, transaction);
  if (findData) {
    if ("title" in data) {
      findData.title = data.title;
    }
    if ("icketCategoryId" in data) {
      findData.icketCategoryId = data.icketCategoryId;
    }
    if ("description" in data) {
      findData.description = data.description;
    }
    if ("status" in data) {
      findData.status = data.status;
    }
    if ("priorityId" in data) {
      findData.priorityId = data.priorityId;
    }
    if ("assignedTo" in data) {
      findData.assignedTo = data.assignedTo;
    }
    return findData;
  }
  return false;
};

const deleteTicket = async (ticketId, transaction) => {
  // console.log(ticketId)
  await ticket.destroy({
    where: {
      id: ticketId,
    },
  });
};

// const getTicketByCustomerId = async (customerId, transaction) => {
//  return await ticket.findAll({
//   where: {
//     createdBy:customerId
//   }
// });
// };

// const getTicketByAgentId = async (agentId, transaction) => {
//   return await ticket.findAll({
//    where: {
//      assignedTo:agentId
//    }
//  });
//  };

export { createTicket, findAllTicket, updateTicket, deleteTicket };
