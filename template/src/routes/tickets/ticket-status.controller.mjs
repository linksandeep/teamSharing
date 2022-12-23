import {
  createTstatus,
  deleteTstatus,
  findAllTstatus,
  findOneTstatus,
} from "../../models/tickets/ticket-status.model.mjs";
import { sequelize } from "../../services/postgres.mjs";

const addTicketStatus = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const bodyData = req.body;
    const ticketStatus = await createTstatus(bodyData, t);
    await t.commit();

    res.status(201).json({
      status: "success",
      data: {
        ticketStatus,
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

const getTicketStatus = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const ticketStatus = await findAllTstatus(t);
    await t.commit();
    res.status(201).json({
      status: "success",
      length: ticketStatus.length,
      data: {
        ticketStatus,
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

const updateTicketStatus = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { statusId } = req.params;

    const bodyData = req.body;
    const tStatus = await findOneTstatus(statusId, t);

    if (!tStatus) {
      return res.status(404).send({ msg: "Data not found with given Id" });
    }

    if ("name" in bodyData) {
      tStatus.name = bodyData.name;
    }
    if ("color" in bodyData) {
      tStatus.color = bodyData.color;
    }
    await tStatus.save({ transaction: t });
    await t.commit();

    res.status(200).json({
      status: "success",
      data: {
        msg:"Updated suc...."
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

const deleteTicketStatus = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { statusId } = req.params;
    await deleteTstatus(statusId, t);
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
  addTicketStatus,
  getTicketStatus,
  updateTicketStatus,
  deleteTicketStatus,
};
