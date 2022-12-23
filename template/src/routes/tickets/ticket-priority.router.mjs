import express from "express";
import { addTicketPriorty, getTicketPriority , updateTicketPriority,deleteTicketPriority} from "./ticket-priority.controller.mjs";


const ticketPriorityRouter = express.Router();

ticketPriorityRouter.get("/", getTicketPriority);
ticketPriorityRouter.post("/", addTicketPriorty);
ticketPriorityRouter.put("/:priorityId",updateTicketPriority)
ticketPriorityRouter.delete('/:priorityId',deleteTicketPriority)

export default ticketPriorityRouter;
