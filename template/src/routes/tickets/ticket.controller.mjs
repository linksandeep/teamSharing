import { createTicket, findAllTicket,updateTicket,deleteTicket} from "../../models/tickets/ticket.model.mjs";
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
      const ticket = await findAllTicket(t);
      await t.commit();
      res.status(201).json({
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

  
  const editTicket= async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const {ticketId}=req.params
        const bodyData = req.body;
       await updateTicket(ticketId,bodyData,t);
      await t.commit();

      res.status(200).json({
        status: "success",
        data: {
          msg:"Updated"
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

 
const destroyTicket= async (req, res, next) => {
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


  
  export { addTicket, getTicket, editTicket,destroyTicket};
  