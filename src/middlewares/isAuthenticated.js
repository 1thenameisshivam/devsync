import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send("Please authenticate");
  }
  try {
    const decodeObj = jwt.verify(token, "devSync@1234");
    const { _id } = decodeObj;
    const user = await User.findById(_id).select("+password");
    if (!user) {
      throw new Error("Please authenticate");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
