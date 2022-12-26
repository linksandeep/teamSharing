import express from "express";
import { addTenantUser } from "./tenant-user.controller.mjs";

const tenantUserRouter = express.Router();


tenantUserRouter.post("/", addTenantUser);


export default tenantUserRouter;