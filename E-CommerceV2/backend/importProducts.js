const fs = require("fs");
const path = require("path");
const connection = require("./db");

// Read the JSON file
const products = JSON.parse(fs.readFileSync(path.join(__dirname, "products.json"), "utf8"));

// Format products for SQL insertion
const formattedProducts = products.map(product => [
    product.title,
    product.description,
    parseFloat(product.price.replace(/[$,]/g, "")), // Convert "$549.99" → 549.99
    product.image
]);

// Insert products into MySQL
const insertQuery = "INSERT INTO products (title, description, price, image) VALUES ?";

connection.query(insertQuery, [formattedProducts], (err, result) => {
  if (err) {
    console.error(" Error inserting data:", err);
    return;
  }
  console.log(`Successfully inserted ${result.affectedRows} products.`);
  connection.end(); // Close the database connection
});
