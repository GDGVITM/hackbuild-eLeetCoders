// controllers/userController.js
import User from "../models/user.model.js";

export async function getCurrentUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.user._id });
    console.log("Current user:", user);

    res.status(200).json({
      status: "sucess",
      me: user,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function getUser(req, res) {
  try {
    const { id } = req.params;

    // Only allow self for now
    if (req.user._id.toString() !== id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const user = await User.findById(id)
      .populate("organization", "name slug")
      .populate({
        path: "registeredEvents",
        populate: { path: "event", select: "title slug startDate endDate" },
      })
      .select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;

    if (req.user._id.toString() !== id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Disallow changing role/org directly via update
    const { role, organization, password, ...updates } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    )
      .populate("organization", "name slug")
      .select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    if (req.user._id.toString() !== id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
