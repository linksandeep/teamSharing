import express from "express";
import {
  addTicket,
  getTicket,
  editTicket,
  destroyTicket,
  getByTicketAndComment,
  getTicketById
} from "./ticket.controller.mjs";

const ticketRouter = express.Router();

ticketRouter.get("/", getTicket);
ticketRouter.get("/:ticketId",getTicketById)
ticketRouter.post("/", addTicket);
ticketRouter.put("/:ticketId", editTicket);
ticketRouter.delete("/:ticketId", destroyTicket);
ticketRouter.get("/:ticketId/comments",getByTicketAndComment)


export default ticketRouter;
