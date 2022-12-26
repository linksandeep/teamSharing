import express from "express";

import ticketPriortyRouter from "./tickets/ticket-priority.router.mjs";
import ticketCategoryRouter from "./tickets/ticket-category.router.mjs";
import ticketStatusRouter from "./tickets/ticket-status.router.mjs";
import userStatusRouter from "./user/user-status.router.mjs";
import ticketRouter from "./tickets/ticket.router.mjs";
import ticketCommnetRouter from "./tickets/ticket-comment.router.mjs";
import customerRouter from "./customers/customer.router.mjs";
import "../associations/index.mjs";
import tenantUserRouter from "./tenant-users/tenant-user.router.mjs";

const api = express.Router();

api.get("/", (req, res) => res.send("<h1>welcome to auth service!</h1>"));

// // 1) ticket-category
api.use("/ticket-categories", ticketCategoryRouter);

// // 2) ticket-status
api.use("/ticket-status", ticketStatusRouter);

// 3) ticket-priorty
api.use("/ticket-priorty", ticketPriortyRouter);

// 4) user-status
api.use("/user-status", userStatusRouter);

// 5) ticket
api.use("/ticket", ticketRouter);

//6) ticket-comment
api.use("/ticket-comment", ticketCommnetRouter);

//7)  customer
api.use("/customer", customerRouter);

//8) tenant-user
api.use("/tenant-user",tenantUserRouter)

export default api;
