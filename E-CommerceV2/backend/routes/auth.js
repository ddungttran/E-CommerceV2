const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router(); 

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// **Register User**
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const [existingUser] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    await db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// **Login User**
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch user from the database
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(400).json({ message: "Invalid credentials" });

    const user = rows[0]; // Extract first user object

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "3h" });

    // Store token in HTTP-only cookie (match expiration with JWT)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3 * 60 * 60 * 1000, // 3 hours
    });

    res.json({ message: "Login successful!" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// **Middleware to Verify Token**
const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// **Get User Profile (Fixed)**
router.get("/me", authenticateUser, async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT id, name, email FROM users WHERE id = ?", [req.user.id]);

    if (rows.length === 0) return res.status(404).json({ message: "User not found" });

    res.json(rows[0]); // Return user details
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// **Logout User**
router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "Strict" });
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
