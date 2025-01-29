import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/me", { withCredentials: true }) 
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
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
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
    justifyContent: "flex-start", // Moves content closer to the top
    height: "30vh",
    textAlign: "center",
    paddingTop: "50px", // Adjust the space from the top
  },
  title: {
    fontSize: "3rem", // Bigger Title
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
    fontSize: "1.8rem", // Make user details bigger
    marginBottom: "15px",
  },
  logoutButton: {
    marginTop: "25px",
    padding: "12px 20px",
    fontSize: "1.5rem", // Bigger logout button
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
