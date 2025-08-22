import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", protectRoute, logoutUser);

export default router;
