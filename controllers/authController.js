const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");

// ----------------user register part start-------------
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  // validation
  if (!username || !email || !password) {
    return res.status(400).json({status: "Failed", message: "All fields are required" });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({status: "Failed", message: "Invalid email format" });
  }
  if (password.length < 6) {
    return res.status(400).json({status: "Failed", message: "Password must be at least 6 characters" });
  }

  // Check duplicate user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({status: "Failed", message: "Email already registered" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashed, role });
  await user.save();
  res.json({status: "Success", message: "User registered" });
};

// ----------------user register part end-------------

// ---------------- login part start-------------
exports.login = async (req, res) => {
  const { email, password } = req.body;
  // Basic validation
  if (!email || !password) {
    return res.status(400).json({status: "Failed", message: "Email and password are required" });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({status: "Failed", message: "Invalid email format" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({status: "Failed", message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({status: "Failed", message: "Invalid password" });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  res.json({status: "Success", accessToken, refreshToken });
};

// ---------------- login part end-------------

// ----------------get refresh token start-------------

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({status: "Failed", message: "No token" });

  const user = await User.findOne({ refreshToken });
  if (!user) return res.status(403).json({status: "Failed",  message: "Invalid refresh token" });

  try {
    jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const accessToken = generateAccessToken(user);
    res.json({status: "Success", accessToken });
  } catch {
    res.status(403).json({status: "Failed", message: "Invalid or expired refresh token" });
  }
};

// ----------------get refresh token end-------------

// ----------------logout part start-------------

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  const user = await User.findOne({ refreshToken });
  if (user) {
    user.refreshToken = null;
    await user.save();
  }
  res.json({ status: "Success", message: "Logged out" });
};
// ----------------logout part end-------------