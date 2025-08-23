import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

import dotenv from "dotenv";
dotenv.config();

const isOrg = async (req, res, next) => {
  try {
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({
          success: false,
          message: "Unauthorized - Not organization admin",
        });
    }

    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export default protectRoute;
