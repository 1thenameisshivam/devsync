import dotenv from "dotenv";

dotenv.config();

export const {
  MONGO_URI,
  JWT_SECRET,
  PORT,
  FRONTEND_URL,
  RAZORPAY_KEY_ID,
  RAZORPAY_SECRET,
  WEB_HOOK_SECRET,
} = process.env;

export const membershipTypes = {
  silver: 700,
  gold: 1000,
};

export const membershipTime = {
  silver: 1,
  gold: 3,
};
