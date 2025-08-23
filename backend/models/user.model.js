import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: false, select: false },
  google_id: { type: String, default: null }, // no unique here!
  role: {
    type: String,
    enum: ["user", "org_admin", "org_member"],
    default: "user",
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    default: null,
  },
  registeredEvents: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
  ],
  createdAt: { type: Date, default: Date.now },
});

userSchema.index({ google_id: 1 }, { unique: true, sparse: true });

const User = mongoose.model("User", userSchema);
export default User;
