require("dotenv").config(); // MUST be at top

const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Signup request body:", req.body);
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All field are required" });
    }

    //hasing the pasword by adding salt ot hasing with 10 rounds
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //for console purpose create one object to console in the browser.
    const userSafe = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    res
      .status(200)
      .json({ message: "UserRegister Successfully", user: userSafe });
  } catch (err) {
    console.log("Sign Up error", err);
    res.status(500).json({ error: "server error" });
  }
});

//LOGIN SET UP:

router.post("/login", async (req, res) => {
  try {
    console.log("login request body:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // ✅ FIX: use findOne
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    res.status(200).json({ message: "Login Successfully", token });
  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
