import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.PAYMENT_KEY_ID,
  key_secret: process.env.PAYMENT_KEY_SECRET,
});

export default razorpay;
