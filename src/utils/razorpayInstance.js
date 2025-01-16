import Razorpay from "razorpay";
import { RAZORPAY_KEY_ID, RAZORPAY_SECRET } from "./constant.js";

export const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_SECRET,
});
