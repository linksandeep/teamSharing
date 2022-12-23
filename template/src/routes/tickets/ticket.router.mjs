import express from "express";
import { addTicket, getTicket,editTicket,destroyTicket} from "./ticket.controller.mjs";


const ticketRouter = express.Router();

ticketRouter .get("/", getTicket);
ticketRouter .post("/", addTicket);
ticketRouter.put("/:ticketId",editTicket)
ticketRouter.delete('/:ticketId',destroyTicket)

export default ticketRouter;
