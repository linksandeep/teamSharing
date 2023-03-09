import path from "path";
import cors from "cors";
import morgan from "morgan";
import express from "express";
// import "./middlewares/passport-config.mjs";

import api from "./routes/api.mjs";
//import CustomError from "./errors/custom-error.mjs";
//import { errorHandler } from "./middlewares/error-handler.mjs";
// import { SequelizeScopeError } from "sequelize/types/index.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(morgan("combined"));
// app.use(passport.initialize());

app.use(express.json());
// app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/", api);

// app.all("*", (req, res, next) =>
//  // next(new CustomError(`${req.originalUrl} not found`, 404))
// );
// //app.use(errorHandler);

export default app;
