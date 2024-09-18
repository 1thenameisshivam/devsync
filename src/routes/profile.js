import express from "express";
import {
  updateProfile,
  view,
  updatePassword,
} from "../controllers/userProfile.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const profileRouter = express.Router();

profileRouter.get("/view", isAuthenticated, view);
profileRouter.patch("/update", isAuthenticated, updateProfile);
profileRouter.patch("/update/password", isAuthenticated, updatePassword);

export default profileRouter;
