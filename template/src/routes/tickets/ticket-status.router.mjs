import express from "express";

import { addTicketStatus, deleteTicketStatus, getTicketStatus, updateTicketStatus} from "./ticket-status.controller.mjs";

const ticketStatusRouter = express.Router();

ticketStatusRouter.get("/", getTicketStatus);
ticketStatusRouter.post("/", addTicketStatus);
ticketStatusRouter.put("/:statusId",updateTicketStatus)
ticketStatusRouter.delete('/:statusId',deleteTicketStatus)


export default ticketStatusRouter;
