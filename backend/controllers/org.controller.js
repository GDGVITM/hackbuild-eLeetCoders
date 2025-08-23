import Organization from "../models/org.model.js";
import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  try {
    const org = await Organization.findById(req.params.org_id).populate(
      "members.user",
      "-password"
    );
    if (!org)
      return res.status(404).json({ message: "Organization not found" });
    res.json(org.members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const org = await Organization.findById(req.params.org_id);
    if (!org)
      return res.status(404).json({ message: "Organization not found" });

    // Check if user already exists
    if (org.members.some((m) => m.user.toString() === userId))
      return res.status(400).json({ message: "User already a member" });

    org.members.push({ user: userId, role: role || "member" });
    await org.save();
    res.status(201).json({ message: "User added to organization" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const org = await Organization.findById(req.params.org_id);
    if (!org)
      return res.status(404).json({ message: "Organization not found" });

    const member = org.members.find((m) => m.user.toString() === userId);
    if (!member)
      return res
        .status(404)
        .json({ message: "User not found in organization" });

    member.role = role;
    await org.save();
    res.json({ message: "User role updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const org = await Organization.findById(req.params.org_id);
    if (!org)
      return res.status(404).json({ message: "Organization not found" });

    const initialLength = org.members.length;
    org.members = org.members.filter((m) => m.user.toString() !== userId);
    if (org.members.length === initialLength)
      return res
        .status(404)
        .json({ message: "User not found in organization" });

    await org.save();
    res.json({ message: "User removed from organization" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
