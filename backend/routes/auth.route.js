import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  loginUser,
  logoutUser,
  registerUser,
  getMe,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protectRoute, logoutUser);
router.get("/me", protectRoute, getMe);

export default router;
