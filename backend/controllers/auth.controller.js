import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateTokens.js";

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Validation checks
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email format" });
    }

    // Check if email already exists
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Password length check
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 6 characters",
      });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a new user
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      role: "user",
      organization: null,
      registeredEvents: [],
    });

    // Generating token and setting cookie
    generateTokenAndSetCookie(newUser._id, res);

    // Saving the new user to the database
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Account has been successfully created",
    });
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Validation checks
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check password match
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generating token and setting cookie
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function logoutUser(req, res) {
  try {
    // Clearing the authentication cookie
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getMe(req, res) {
  try {
    const { userId } = req.cookies;

    const user = User.findOne({ id: userId });

    res.status(200).json({
      status: "sucess",
      me: user,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
