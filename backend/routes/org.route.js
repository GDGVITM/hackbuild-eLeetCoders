import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/org.controller.js";

const router = express.Router();

router.get("/:org_id", protectRoute, getUser);
router.post("/:org_id", protectRoute, addUser);
router.put("/:org_id", protectRoute, updateUser);
router.delete("/:org_id", protectRoute, deleteUser);

export default router;
