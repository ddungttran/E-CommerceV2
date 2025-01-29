require("dotenv").config();
const mysql = require("mysql2/promise");

// Debug: Print environment variables to check if they are loaded
console.log("Database Config:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.PORT,
});

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "test",
  port: process.env.PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection()
  .then((connection) => {
    console.log("Connected to MySQL Database: " + process.env.DB_NAME);
    connection.release();
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

module.exports = pool;
