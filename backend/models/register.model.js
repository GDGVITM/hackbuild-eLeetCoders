import mongoose from "mongoose";

// models/Registration.js
import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    qrCode: { type: String }, // QR code string/image link
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },

    status: {
      type: String,
      enum: ["registered", "cancelled", "checked_in"],
      default: "registered",
    },
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;
