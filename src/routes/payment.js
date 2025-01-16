import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createOrder, verifySignature } from "../controllers/order.js";

const paymentRouter = express.Router();

paymentRouter.post("/order", isAuthenticated, createOrder);
paymentRouter.post("/webhook", verifySignature);

export default paymentRouter;
