import {
  findOneTpriority,
  createTpriority,
  findAllTpriority,
  deleteTpriority,
} from "../../models/tickets/ticket-priority.model.mjs";
import { sequelize } from "../../services/postgres.mjs";

const addTicketPriorty = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const bodyData = req.body;
    const ticketPriority = await createTpriority(bodyData, t);
    await t.commit();

    res.status(201).json({
      status: "success",
      data: {
        ticketPriority,
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

const getTicketPriority = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const ticketPriority = await findAllTpriority(t);
    await t.commit();
    res.status(200).json({
      status: "success",
      length: ticketPriority.length,
      data: {
        ticketPriority,
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

const updateTicketPriority= async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { priorityId } = req.params;

    const bodyData = req.body;
    const priority = await findOneTpriority(priorityId, t);
    //console.log(priority)
    if(!priority){ return res.status(404).send({msg:"Data not found with given Id"})}
    //if(Object.keys(priority).length===0) return res.status(404).json({msg:"No data found"})
    if ("name" in bodyData) {
      priority.name = bodyData.name;
    }
    if ("color" in bodyData) {
      priority.color = bodyData.color;
    }
    await priority.save({ transaction: t });
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

const deleteTicketPriority = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { priorityId } = req.params;
    await deleteTpriority(priorityId, t);
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
  addTicketPriorty,
  getTicketPriority,
  updateTicketPriority,
  deleteTicketPriority,
};
