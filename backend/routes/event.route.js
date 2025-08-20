import express from "express";
import {
  createEvent,
  allEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

// Add your Protected User Routes here...

router.post("/", createEvent);
router.get("/", allEvents);
router.get("/:slug", getEvent);
router.put("/:slug", protectRoute, updateEvent);
router.delete("/:slug", protectRoute, deleteEvent);

export default router;
