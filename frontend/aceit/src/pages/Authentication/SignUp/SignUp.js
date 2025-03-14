import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Submitted", formData);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        {/* Left Side - Video */}
        <div className="signup-media">
          <video autoPlay loop muted>
            <source src={`${process.env.PUBLIC_URL}/videos/login.mp4`} type="video/mp4" />
          </video>
        </div>

        {/* Right Side - Signup Form */}
        <div className="signup-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <div className="button-group">
              <button type="submit">Sign Up</button>
            </div>

            {/* Already have an account? Login Link */}
            <div className="login-link">
              <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;