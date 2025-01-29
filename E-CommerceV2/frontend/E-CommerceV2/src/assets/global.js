// 🌍 GLOBAL.JS - Centralized Configuration & Utility Functions

// API Base URL (Backend Server)
export const API_BASE_URL = "http://localhost:5000/api"; // Change this to match your backend

//  Utility Functions
// Format price as currency
export function formatPrice(price) {
  return `$${parseFloat(price).toFixed(2)}`;
}

// Handle API errors
export function handleApiError(error) {
  console.error("API Error:", error);
  return { error: "Something went wrong. Please try again later." };
}

// Global State (Basic Example - Consider Redux or Context API for Large Apps)
export const globalState = {
  cart: [],
  addToCart: (product) => {
    globalState.cart.push(product);
    console.log("Added to Cart:", globalState.cart);
  },
};

// Fetch Products from Database
export async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
}

// Form Validation (for Signup or Contact Form)
export function validateForm({ firstName, lastName, email }) {
  let errors = [];

  if (!firstName.trim()) errors.push("First Name is required.");
  if (!lastName.trim()) errors.push("Last Name is required.");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) errors.push("Email is required.");
  else if (!emailRegex.test(email)) errors.push("A valid Email Address is required.");

  return errors.length > 0 ? errors.join("\n") : null;
}
