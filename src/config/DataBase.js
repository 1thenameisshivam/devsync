import mongoose from "mongoose";
import { MONGO_URI } from "../utils/constant.js";
export const DataBase = async () => {
  await mongoose.connect(MONGO_URI);
};
