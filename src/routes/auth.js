import express from "express";
import { signUp, logOut, login } from "../controllers/authentication.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logOut);

export default authRouter;
