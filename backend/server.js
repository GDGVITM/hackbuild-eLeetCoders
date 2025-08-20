import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import connectDB from "./config/db.js";

import dotenv from "dotenv";
dotenv.config();

// website routes
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import eventRouter from "./routes/event.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Its working!!");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend Server is working on http://localhost:${PORT}`);
});
