import {
  createTicket,
  findAllTicket,
  updateTicket,
  deleteTicket,
  findTicketByTicketId,
  getTicketByTicketIdAndCommentID,
} from "../../models/tickets/ticket.model.mjs";
import { sequelize } from "../../services/postgres.mjs";

const addTicket = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const bodyData = req.body;
    const ticket = await createTicket(bodyData, t);
    await t.commit();

    res.status(201).json({
      status: "success",
      data: {
        ticket,
      },
    });
  } catch (err) {
    await t.rollback();
    console.log("getting error...");
    console.error(err);
    res.status(400).json({
      error: err,
    });
  }
};

const getTicket = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { customerId, agentId } = req.query;
    let obj = {};
    if (customerId) obj.createdBy = customerId;
    if (agentId) obj.assignedTo = agentId;
    const ticket = await findAllTicket(obj, t);
    if (!ticket) res.status(404).send({ msg: "no data found" });
    await t.commit();
    res.status(200).json({
      status: "success",
      length: ticket.length,
      data: {
        ticket,
      },
    });
  } catch (err) {
    await t.rollback();
    console.log("getting error...");
    console.error(err);
    res.status(400).json({
      error: err,
    });
  }
};

const getTicketById = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const ticketId = req.params.ticketId;
    const ticket = await findTicketByTicketId(ticketId, t);
    if (!ticket) return res.status(404).send({ msg: "No data found" });
    await t.commit();
    res.status(200).send({
      status: "success",
      data: {
        ticket,
      },
    });
  } catch (err) {
    await t.rollback();
    console.log("getting error...");
    console.error(err);
    res.status(400).json({
      error: err,
    });
  }
};

const getByTicketAndComment = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const ticketId = req.params.ticketId;
    const ticket = await getTicketByTicketIdAndCommentID(ticketId, t);
    await t.commit();
    res.status(200).json({
      status: "success",
      length: ticket.length,
      data: {
        ticket,
      },
    });
  } catch (err) {
    await t.rollback();
    console.log("getting error...");
    console.error(err);
    res.status(400).json({
      error: err,
    });
  }
};

const editTicket = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { ticketId } = req.params;
    const bodyData = req.body;
    const updatedTicket = await updateTicket(ticketId, bodyData, t);
    if (!updatedTicket) return res.status(404).send({ msg: "No data found" });
    await updatedTicket.save({ transaction: t });
    await t.commit();
    res.status(200).json({
      status: "success",
      data: {
        msg: "data updated",
      },
    });
  } catch (err) {
    await t.rollback();
    console.log("getting error...");
    console.error(err);
    res.status(400).json({
      error: err,
    });
  }
};

const destroyTicket = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { ticketId } = req.params;
    await deleteTicket(ticketId, t);
    await t.commit();
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    await t.rollback();
    console.log("getting error...");
    console.error(err);
    res.status(400).json({
      error: err,
    });
  }
};

export {
  addTicket,
  getTicket,
  editTicket,
  destroyTicket,
  getTicketById,
  getByTicketAndComment,
};
