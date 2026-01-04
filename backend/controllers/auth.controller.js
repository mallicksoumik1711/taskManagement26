const userSchema = require("../models/users.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userSchema.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(newUser);
    res.cookie("token", token, {
      httpOnly: true,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser.email });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const loginSuccess = await bcrypt.compare(password, user.password);
    if (!loginSuccess) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).json({ message: "Login successful", user: user.email });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Error logging out", error: err.message });
  }
};

module.exports = { login, logout, register };
