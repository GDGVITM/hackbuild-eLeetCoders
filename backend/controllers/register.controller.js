export async function createRegistration(req, res) {
  try {
    const eventId = req.params.eventId;
    const userId = req.user.id;
    const registration = await Registration.create({ eventId, userId });
    res.status(201).json({ registration });
  } catch (error) {
    console.error("Error creating registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getRegistrations(req, res) {
  try {
    const registrations = await Registration.find().exec();
    res.status(200).json({ registrations });
  } catch (error) {
    console.error("Error getting registrations:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getRegistration(req, res) {
  try {
    const registrationId = req.params.registrationId;
    const registration = await Registration.findById(registrationId).exec();
    if (!registration) {
      return res
        .status(404)
        .json({ success: false, message: "Registration not found" });
    }
    res.status(200).json({ registration });
  } catch (error) {
    console.error("Error getting registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function updateRegistration(req, res) {
  try {
    const registrationId = req.params.registrationId;
    const { eventId, userId } = req.body;
    const registration = await Registration.findById(registrationId).exec();
    if (!registration) {
      return res
        .status(404)
        .json({ success: false, message: "Registration not found" });
    }
    registration.eventId = eventId;
    registration.userId = userId;
    await registration.save();
    res.status(200).json({ registration });
  } catch (error) {
    console.error("Error updating registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function cancelRegistration(req, res) {
  try {
    const registrationId = req.params.registrationId;
    const registration = await Registration.findById(registrationId).exec();
    if (!registration) {
      return res
        .status(404)
        .json({ success: false, message: "Registration not found" });
    }
    await registration.remove();
    res
      .status(200)
      .json({ success: true, message: "Registration deleted successfully" });
  } catch (error) {
    console.error("Error deleting registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
