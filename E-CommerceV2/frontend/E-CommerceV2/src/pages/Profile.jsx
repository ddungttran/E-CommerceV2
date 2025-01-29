import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config"; // Import API URL from config.js

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    axios.get(`${API_URL}/api/auth/me`, { withCredentials: true }) 
      .then(response => {
        console.log("User data fetched:", response.data);
        setUser(response.data);
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
      navigate("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Profile</h2>
      {user ? (
        <div style={styles.profileBox}>
          <p style={styles.info}><strong>Name:</strong> {user.name}</p>
          <p style={styles.info}><strong>Email:</strong> {user.email}</p>
          <button style={styles.logoutButton} onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <p style={styles.loading}>Loading profile...</p>
      )}
    </div>
  );
};

// **Inline Styles**
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start", 
    height: "30vh",
    textAlign: "center",
    paddingTop: "50px", 
  },
  title: {
    fontSize: "3rem", 
    fontWeight: "bold",
    marginBottom: "20px",
  },
  profileBox: {
    padding: "40px",
    borderRadius: "10px",
    width: "400px",
    textAlign: "left",
  },
  info: {
    fontSize: "1.8rem", 
    marginBottom: "15px",
  },
  logoutButton: {
    marginTop: "25px",
    padding: "12px 20px",
    fontSize: "1.5rem", 
    backgroundColor: "#ff3333",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  logoutButtonHover: {
    backgroundColor: "#cc0000",
  },
  loading: {
    fontSize: "1.5rem",
  }
};

export default Profile;
