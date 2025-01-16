import { razorpayInstance } from "../utils/razorpayInstance.js";
import PaymentDetails from "../models/paymenyDetails.js";
import { membershipTypes, RAZORPAY_KEY_ID } from "../utils/constant.js";
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
