import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  userRequests,
  userConnections,
  userFeed,
} from "../controllers/userController.js";
import { premiumStatus } from "../controllers/order.js";

const userRouter = express.Router();

userRouter.get("/requests", isAuthenticated, userRequests);
userRouter.get("/connections", isAuthenticated, userConnections);
userRouter.get("/feed", isAuthenticated, userFeed);
userRouter.get("/premium", isAuthenticated, premiumStatus);

export default userRouter;
