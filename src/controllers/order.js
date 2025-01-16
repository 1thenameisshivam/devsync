import { razorpayInstance } from "../utils/razorpayInstance.js";
import PaymentDetails from "../models/paymenyDetails.js";
import {
  membershipTypes,
  RAZORPAY_KEY_ID,
  WEB_HOOK_SECRET,
} from "../utils/constant.js";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import User from "../models/user.js";
export const createOrder = async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, email } = req.user;

    const order = await razorpayInstance.orders.create({
      amount: membershipTypes[membershipType] * 100,
      currency: "INR",
      receipt: "receipt_1",
      notes: {
        firstName,
        lastName,
        email,
        membershipType: membershipType,
      },
    });

    const payment = new PaymentDetails({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      ammount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savePaymentDetails = await payment.save();
    res
      .status(200)
      .json({ ...savePaymentDetails.toJSON(), keyId: RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).send({ message: err, status: false });
  }
};

export const verifySignature = async (req, res) => {
  try {
    const webhookSignature = req.headers["x-razorpay-signature"];
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      WEB_HOOK_SECRET
    );

    if (!isWebhookValid) {
      return res
        .status(400)
        .send({ message: "Invalid signature", status: false });
    }

    const paymentinfo = req.body.payload.payment.entity;
    const payment = await PaymentDetails.findOne({
      orderId: paymentinfo.order_id,
    });
    payment.status = paymentinfo.status;
    await payment.save();
    const user = await User.findById(payment.userId);
    user.membershipType = payment.notes.membershipType;
    user.isPremium = true;
    await user.save();
    return res.status(200).send({ message: "Webhook verified", status: true });
  } catch (err) {
    res.status(500).send({ message: err, status: false });
  }
};

export const premiumStatus = async (req, res) => {
  try {
    const user = req.user.isPremium;
    if (user) {
      return res.status(200).send({ message: "User is premium", status: true });
    }
    return res
      .status(200)
      .send({ message: "User is not premium", status: false });
  } catch (err) {
    res.status(500).send({ message: err, status: false });
  }
};
