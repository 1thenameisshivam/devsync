import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import requestReview from "../controllers/requestReview.js";
const requestApproveRouter = express.Router();

requestApproveRouter.post(
  "/:status/:requestId",
  isAuthenticated,
  requestReview
);

export default requestApproveRouter;
