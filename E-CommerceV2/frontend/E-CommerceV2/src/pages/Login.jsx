import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../config"; // Import API URL from config.js

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect authenticated users to the profile page
  useEffect(() => {
    const token = document.cookie.split("; ").find(row => row.startsWith("token="));
    if (token) {
      navigate("/profile"); // Redirect to profile page if already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, { // Use API_URL dynamically
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/profile"); // Redirect to profile after login
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>

      {/* Register Link under password field */}
      <p style={{ marginTop: "10px", textAlign: "center" }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "blue", textDecoration: "underline" }}>
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
