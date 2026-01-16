import crypto from "crypto";

import razorpay from "../config/razorpay.js";

export const createOrder = async (req, res) => {
  try {
    const { amount, rdPaymentId } = req.body;

    //  Create order
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `rd_${rdPaymentId}`,
    });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "OrderCreation failed" });
    console.log("Internal server Error in the:- ", error.message);
  }
};

export const verifypayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // ✅ Payment verified
    // TODO: update rd_payments + rd_passbook (transaction)

    res.json({ message: "Payment verified successfully" });
  } catch (error) {
    console.log("Internal server error in Verifypayment ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
