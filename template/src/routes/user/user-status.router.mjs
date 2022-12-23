import express from "express";
import { addUserStatus, getUserStatus,updateUserStatus,deleteUserStatus} from "./user-status.controller.mjs";

const userStatusRouter = express.Router();

userStatusRouter.get("/", getUserStatus);
userStatusRouter.post("/", addUserStatus);
userStatusRouter.put("/:uStatusId", updateUserStatus)
userStatusRouter.delete("/:uStatusId", deleteUserStatus)

export default userStatusRouter;
