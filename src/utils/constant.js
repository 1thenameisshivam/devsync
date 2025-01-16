import dotenv from "dotenv";

dotenv.config();

export const {
  MONGO_URI,
  JWT_SECRET,
  PORT,
  FRONTEND_URL,
  RAZORPAY_KEY_ID,
  RAZORPAY_SECRET,
} = process.env;

export const membershipTypes = {
  silver: 700,
  gold: 1000,
};
