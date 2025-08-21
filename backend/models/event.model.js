import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // for SEO-friendly URL
  description: { type: String },
  category: {
    type: String,
    enum: ["technical", "cultural", "sports", "workshop", "seminar"],
    required: true,
  },
  venue: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  capacity: { type: Number, required: true }, // max attendees
  isPaid: { type: Boolean, default: false },
  price: { type: Number, default: 0 }, // ticket price if paid
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // who created
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Registration" }],
  waitlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Waitlist" }],
  feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
