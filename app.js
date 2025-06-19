import express from "express";
import { DataBase } from "./src/config/DataBase.js";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/auth.js";
import profileRouter from "./src/routes/profile.js";
import connectionRouter from "./src/routes/connection.js";
import requestApproveRouter from "./src/routes/requestApprove.js";
import userRouter from "./src/routes/userRouter.js";
import cors from "cors";
import { FRONTEND_URL, PORT } from "./src/utils/constant.js";
import paymentRouter from "./src/routes/payment.js";
import http from "http";
import "./src/utils/cronjobs.js";
import initializeSocket from "./src/utils/socket.js";
const app = express();

const server = http.createServer(app);
initializeSocket(server);
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Healthy Server Response from Server : " + PORT || 3000);
});

app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/request/send", connectionRouter);
app.use("/review/send", requestApproveRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);
DataBase()
  .then(() => {
    console.log("Database connected");
    server.listen(PORT || 3000, () => {
      console.log("Server is running on port " + PORT || 3000);
    });
  })
  .catch((err) => {
    console.log("database is not able to connect", err);
  });
