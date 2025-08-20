import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    registration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    amount: { type: Number, required: true },
    method: {
      type: String,
      enum: ["upi", "card", "netbanking", "wallet"],
      required: true,
    },
    status: {
      type: String,
      enum: ["initiated", "successful", "failed", "refunded"],
      default: "initiated",
    },
    transactionId: { type: String, unique: true },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
