import express from "express";
import router from "./event.router.mjs";


const api = express.Router();

api.get("/", (req, res) => res.send("<h1>welcome to auth service!</h1>"));

// // // 1) ticket-category
// api.use("/ticket-categories", ticketCategoryRouter);
api.use('/',router)

export default api;
