import mongoose from "mongoose";

export const DataBase = async () => {
  await mongoose.connect("mongodb://localhost:27017/DevSync");
};
