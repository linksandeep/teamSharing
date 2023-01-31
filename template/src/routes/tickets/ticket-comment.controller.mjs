import {
  createTcomment,
  findAllTcomment,
} from "../../models/tickets/ticket-comment.model.mjs";
import { sequelize } from "../../services/postgres.mjs";

const addTicketComment = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const bodyData = req.body;
    const ticketComment = await createTcomment(bodyData, t);
    await t.commit();

    res.status(201).json({
      status: "success",
      data: {
        ticketComment,
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

const getTicketComment = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { ticketId } = req.params;
    const ticketComment = await findAllTcomment(ticketId, t);
    if (!ticketComment.length)
      return res.status(404).json({ msg: "no data found" });
    await t.commit();
    return res.status(200).json({
      status: "success",
      length: ticketComment.length,
      data: {
        ticketComment,
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

// const deleteTicketComment = async (req, res, next) => {
//   const t = await sequelize.transaction();
//   try {
//     const { ticketID} = req.params;
//     await deleteTcomment(ticketId, t);
//     await t.commit();

//     res.status(204).json({
//       status: "success",
//     });
//   } catch (err) {
//     await t.rollback();
//     console.log("getting error...");
//     console.error(err);
//     res.status(400).json({
//       error: err,
//     });
//   }
// };

export { addTicketComment, getTicketComment };
