import ticket from "./ticket.postgres.mjs";

const createTicket = async (data, transaction) => {
  return await ticket.create(data, { transaction });
};

const findAllTicket = async (transaction) => {
  return await ticket.findAll({ transaction });
};

const updateTicket = async (ticketId, data, transaction) => {
  return await ticket.update(
        data,
        {
          where: {
            id: ticketId,
          },
        },
        { transaction }
      );
    };

const deleteTicket = async (ticketId, transaction) => {
   // console.log(ticketId)
  await ticket.destroy({
    where: {
      id: ticketId,
    },
  });
};

export { createTicket, findAllTicket, updateTicket, deleteTicket };
