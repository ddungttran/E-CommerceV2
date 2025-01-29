const express = require("express");
const router = express.Router();
const pool = require("../db"); // Ensure correct import

// Get all products
router.get("/", async (req, res) => {
  try {
    const [products] = await pool.query("SELECT * FROM products"); // Fix query syntax
    console.log("Fetched products:", products); // Debugging log
    res.json(products);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
