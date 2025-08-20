import Event from "../models/event.model.js";
import slugify from "slugify";

// Create Event
export async function createEvent(req, res) {
  try {
    const {
      title,
      slug,
      description,
      category,
      startTime,
      endTime,
      location,
      organizers,
      capacity,
      price,
      waitlistEnabled,
    } = req.body;

    // ✅ Basic validation
    if (!title || !startTime || !endTime || !location) {
      return res.status(400).json({
        message: "Missing required fields: title, startTime, endTime, location",
      });
    }

    let finalSlug = slug
      ? slugify(slug, { lower: true, strict: true })
      : slugify(title, { lower: true, strict: true });

    // Check if slug already exists
    const existing = await Event.findOne({ slug: finalSlug });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Slug already exists. Please choose another." });
    }

    const newEvent = new Event({
      title,
      slug: finalSlug,
      description,
      category,
      startTime,
      endTime,
      location,
      organizers,
      capacity,
      price,
      waitlistEnabled,
    });

    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// Get All Events
export async function allEvents(req, res) {
  try {
    const events = await Event.find();
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getEvent(req, res) {
  try {
    const { slug } = req.params;

    const event = await Event.findById(slug);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// Update Event
export async function updateEvent(req, res) {
  try {
    const { slug } = req.params;
    const event = await Event.findByIdAndUpdate(slug, req.body, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

// Delete Event
export async function deleteEvent(req, res) {
  try {
    const { slug } = req.params;
    const event = await Event.findByIdAndDelete(slug);

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
