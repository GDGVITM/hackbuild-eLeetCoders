import User from "../models/user.model.js";
import axios from "axios";
import generateTokenAndSetCookie from "../utils/generateTokens.js";

import dotenv from "dotenv";
dotenv.config();

export const googleLogin = async (req, res) => {
  const redirectUrl = "http://localhost:5000/api/oauth/google/callback";
  const clientId = process.env.GOOGLE_CLIENT_ID;

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=email profile&access_type=offline&prompt=consent`;

  res.redirect(url);
};

export const googleCallback = async (req, res) => {
  const { code } = req.query;
  const redirectUri = "http://localhost:5000/api/oauth/google/callback";

  try {
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    });

    const { access_token } = tokenRes.data;

    const userRes = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const googleUser = userRes.data;

    // 3. Check if user already exists
    let user = await User.findOne({ email: googleUser.email });

    if (!user) {
      // 4. If not, create new user
      user = new User({
        name: googleUser.name,
        email: googleUser.email,
        password: null, // no password for OAuth users
        googleId: googleUser.id,
        role: "user",
        organization: null,
        registeredEvents: [],
      });
      await user.save();
    }

    generateTokenAndSetCookie(user._id, res);

    res.redirect("http://localhost:3000/dashboard");
  } catch (error) {
    console.error("Error in oauth controller:", error.message);
    res.status(500).json({ message: "OAuth login failed" });
  }
};
