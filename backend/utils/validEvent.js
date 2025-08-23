import Event from "../models/event.model.js";

const validEvent = async (
  title,
  slug,
  description,
  category,
  venue,
  startDate,
  endDate,
  capacity,
  isPaid,
  price,
  organizer,
  createdBy,
  res
) => {
  try {
    // Validation checks
    if (
      !title ||
      !slug ||
      !description ||
      !category ||
      !venue ||
      !startDate ||
      !endDate ||
      !capacity ||
      !organizer ||
      !createdBy
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All required fields are missing" });
    }

    // Check if slug already exists
    const existing = await Event.findOne({ slug: slug });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Slug already exists. Please choose another." });
    }

    // Category validation
    const categories = [
      "technical",
      "cultural",
      "sports",
      "workshop",
      "seminar",
    ];
    if (!categories.includes(category)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category" });
    }

    // Date validation
    if (startDate > endDate) {
      return res.status(400).json({
        success: false,
        message: "Start date should be before end date",
      });
    }

    // Capacity validation
    if (capacity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Capacity should be a positive number",
      });
    }

    // Price validation
    if (isPaid) {
      if (price <= 0) {
        return res.status(400).json({
          success: false,
          message: "Price should be a positive number",
        });
      }
    }
  } catch (error) {
    console.error("Error validating event:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export default validEvent;
