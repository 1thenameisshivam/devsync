import mongoose from "mongoose";

export const DataBase = async () => {
  await mongoose.connect(
    "mongodb+srv://shivamkumarcs21:tcS3zcVOMsdLgsHH@thunderbolt.e09g8.mongodb.net/DevSync"
  );
};
