import Event from "../models/event.model.js";
import slugify from "slugify";
import validEvent from "../utils/validEvent.js";
import User from "../models/user.model.js";
import validEvent from "../utils/validEvent.js";

// Create Event
export async function createEvent(req, res) {
  try {
    const {
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
    } = req.body;

    const { userId } = req.cookies;
    const user = User.find({ id: userId });

    const createdBy = userId;
    const organizer = user.organization;

    // Slug generation (if not provided)
    let finalSlug = slug
      ? slugify(slug, { lower: true, strict: true })
      : slugify(title, { lower: true, strict: true });

    validEvent(
      title,
      finalSlug,
      description,
      category,
      venue,
      startDate,
      endDate,
      capacity,
      isPaid,
      price,
      organizer,
      createdBy
    );

    const newEvent = new Event({
      title: title,
      slug: finalSlug,
      description: description,
      category: category,
      venue: venue,
      startDate: startDate,
      endDate: endDate,
      capacity: capacity,
      isPaid: isPaid,
      price: price,
      organizer: organizer,
      createdBy: createdBy,
      attendees: [],
      waitlist: [],
      feedback: [],
    });

    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Get All Events
export async function allEvents(req, res) {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (error) {
    console.error("Error getting events:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
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
    const eventId = req.params.eventId;
    const {
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
    } = req.body;

    // Find the event to update
    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    // Validate the request body
    if (
      !title ||
      !description ||
      !category ||
      !venue ||
      !startDate ||
      !endDate ||
      !capacity ||
      isPaid === null ||
      price === null
    ) {
      return res
        .status(400)
        .json({ message: "Bad request. All required fields are missing." });
    }

    // Update the event fields
    event.title = title;
    event.slug = slug;
    event.description = description;
    event.category = category;
    event.venue = venue;
    event.startDate = startDate;
    event.endDate = endDate;
    event.capacity = capacity;
    event.isPaid = isPaid;
    event.price = price;

    // Validate the event
    if (startDate > endDate) {
      return res
        .status(400)
        .json({ message: "Start date should be before end date" });
    }

    if (capacity <= 0) {
      return res
        .status(400)
        .json({ message: "Capacity should be a positive number" });
    }

    if (isPaid && price <= 0) {
      return res
        .status(400)
        .json({ message: "Price should be a positive number" });
    }

    // Save the updated event
    await event.save();
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
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
