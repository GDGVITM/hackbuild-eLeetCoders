import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true }, // for URL
  description: { type: String },
  logo: { type: String },
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      role: {
        type: String,
        enum: ["admin", "event_manager", "communications", "member"],
        default: "member",
      },
    },
  ],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  createdAt: { type: Date, default: Date.now },
});

const Organization = mongoose.model("Organization", OrganizationSchema);
export default Organization;
