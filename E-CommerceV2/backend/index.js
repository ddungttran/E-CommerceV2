const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Required for handling cookies
const productsRoute = require("./routes/products");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const connection = require("./db");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Adjust to your frontend URL
  credentials: true // Allows frontend to send cookies
}));
app.use(express.json());
app.use(cookieParser()); // Required for JWT cookies

// Routes
app.use("/api/products", productsRoute);
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
