import { useState } from "react";
import { validateForm } from "../assets/global"; 

function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMessage = validateForm(formData);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError("");
    console.log("Form Submitted:", formData);
    alert("Signup Successful!");
  };

  return (
    <div className="contact">
      <h2 className="contact-heading">Sign up for Newsletter</h2>
      <p className="contact-paragraph">
        We’re solving the biggest problems in furniture
      </p>
      <form onSubmit={handleSubmit}>
        <div className="inputs-group">
          <input
            type="text"
            name="firstName"
            className="input-group-text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            className="input-group-text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="inputs-group">
          <input
            type="email"
            name="email"
            className="inputs-group-email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <button type="submit" className="inputs-group-btn">Sign Up</button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default SignupForm;
