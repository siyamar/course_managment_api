const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashed, role });
  await user.save();
  res.json({ message: "User registered" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid password" });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  res.json({ accessToken, refreshToken });
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "No token" });

  const user = await User.findOne({ refreshToken });
  if (!user) return res.status(403).json({ message: "Invalid refresh token" });

  try {
    jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  const user = await User.findOne({ refreshToken });
  if (user) {
    user.refreshToken = null;
    await user.save();
  }
  res.json({ message: "Logged out" });
};
