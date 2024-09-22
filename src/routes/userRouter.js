import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  userRequests,
  userConnections,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/requests", isAuthenticated, userRequests);
userRouter.get("/connections", isAuthenticated, userConnections);

export default userRouter;
