import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  getCurrentUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCurrentUser);
router.get("/:id", protectRoute, getUser);
router.put("/:id", protectRoute, updateUser);
router.delete("/:id", protectRoute, deleteUser);

export default router;
