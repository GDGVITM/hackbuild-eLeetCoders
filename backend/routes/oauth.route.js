import express from "express";
import {
  googleLogin,
  googleCallback,
} from "../controllers/oauth.controller.js";

const router = express.Router();

router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);

export default router;
