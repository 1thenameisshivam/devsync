import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createOrder } from "../controllers/order.js";

const paymentRouter = express.Router();

paymentRouter.post("/order", isAuthenticated, createOrder);

export default paymentRouter;
