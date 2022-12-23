import express from "express";
import { addTicketComment, getTicketComment} from "./ticket-comment.controller.mjs";
const ticketCommnetRouter = express.Router();

ticketCommnetRouter.get("/:ticketId", getTicketComment);
ticketCommnetRouter.post("/", addTicketComment);

export default ticketCommnetRouter;
