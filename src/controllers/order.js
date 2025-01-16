import { razorpayInstance } from "../utils/razorpayInstance.js";
import PaymentDetails from "../models/paymenyDetails.js";
export const createOrder = async (req, res) => {
  try {
    const order = await razorpayInstance.orders.create({
      amount: 7000,
      currency: "INR",
      receipt: "receipt_1",
      notes: {
        firstName: "John",
        lastName: "Doe",
        membershipType: "Pro Plan",
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
    res.status(200).json({ ...savePaymentDetails.toJSON() });
  } catch (err) {
    res.status(500).send({ message: err, status: false });
  }
};
