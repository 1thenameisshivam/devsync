import express from "express";
import { DataBase } from "./src/config/DataBase.js";
import User from "./src/models/user.js";
import cookieParser from "cookie-parser";

import authRouter from "./src/routes/auth.js";
import profileRouter from "./src/routes/profile.js";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/profile", profileRouter);

DataBase()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("database is not able to connect", err);
  });
