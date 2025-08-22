import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: false, select: false },
  googleId: { type: String, unique: true, sparse: true },
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

const User = mongoose.model("User", userSchema);
export default User;
