import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Lax", // <-- allow cross-origin cookies
    secure: false, // <-- use true in production (https). false for local dev.
  });

  return token;
};

export default generateTokenAndSetCookie;
