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
import oauthRouter from "./routes/oauth.route.js";
import userRouter from "./routes/user.route.js";
import orgRouter from "./routes/org.route.js";
import eventRouter from "./routes/event.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // your Next.js frontend URL
    credentials: true, // allow cookies to be sent
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Its working!!");
});

app.use("/api/auth", authRouter);
app.use("/api/oauth", oauthRouter);
app.use("/api/user", userRouter);
app.use("/api/org", orgRouter);
app.use("/api/event", eventRouter);
// app.use("/api/register", registerRouter);
// app.use("/api/payment", paymentRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend Server is working on http://localhost:${PORT}`);
});
