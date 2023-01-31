import express from "express";

import {
  addTicketCategories,
  deleteTicketCategory,
  getTicketCategories,
  updateTicketCategory,
} from "./ticket-category.controller.mjs";

const ticketCategoryRouter = express.Router();

ticketCategoryRouter.get("/", getTicketCategories);
ticketCategoryRouter.post("/", addTicketCategories);
ticketCategoryRouter.put("/:categoryId", updateTicketCategory);
ticketCategoryRouter.delete("/:categoryId", deleteTicketCategory);

export default ticketCategoryRouter;
