import express from "express";
import { addCustomer } from "./customer.controller.mjs";

const customerRouter = express.Router();


customerRouter.post("/", addCustomer);


export default customerRouter;