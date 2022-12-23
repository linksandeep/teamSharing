import express from "express";

import { createTest, getTests } from "./tests.controller.mjs";

const testRouter = express.Router();

testRouter.get("/", getTests);
testRouter.post("/", createTest);

export default testRouter;
