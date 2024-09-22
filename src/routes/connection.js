import express from "express";
import { sendRequest } from "../controllers/connections.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const connectionRouter = express.Router();

connectionRouter.post("/:status/:userId", isAuthenticated, sendRequest);

export default connectionRouter;
