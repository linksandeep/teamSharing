import Ticket from "./ticket.postgres.mjs";
import tComment from "./ticket-comment.postgres.mjs";

const createTicket = async (data, transaction) => {
  return await Ticket.create(data, { transaction });
};

const findAllTicket = async (obj, transaction) => {
  // console.log(obj, "<<<<<<>>>>>>>>>>>>>>>>>>>>>>>.....>>>>>>>>>");
  if (obj) {
    const data = await Ticket.findAll({ where:  obj, transaction  });
    return data;
  }
  return await Tstatus.findAll({ transaction });
};

const updateTicket = async (ticketId, data, transaction) => {
  let findData = await Ticket.findOne({ where: { id: ticketId } }, transaction);
  if (!findData) return findData
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
    return findData
};

const deleteTicket = async (ticketId, transaction) => {
  await Ticket.destroy({
    where: {
      id: ticketId,
    },
  });
};

const findTicketByTicketId = async (ticketId, transaction) => {
 return await Ticket.findByPk(ticketId,{transaction});
}
const getTicketByTicketIdAndCommentID = async (ticketId,transaction) => {
  return await tComment.findAll({
    where: {ticketId: ticketId },transaction
  });
}
  

export { createTicket, findAllTicket, updateTicket, deleteTicket,findTicketByTicketId,getTicketByTicketIdAndCommentID};
