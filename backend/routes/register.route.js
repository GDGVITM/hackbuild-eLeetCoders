import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  registerEvent,
  getEventAttendees,
  cancelRegistration,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/:id/register", protectRoute, registerEvent);
router.get("/:id/attendees", protectRoute, getEventAttendees);
router.delete("/:id/register", protectRoute, cancelRegistration);

export default router;
