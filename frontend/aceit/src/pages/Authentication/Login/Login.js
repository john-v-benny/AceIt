import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Login.css"; // Import CSS for styling

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submitted", formData);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Left Side - Video */}
        <div className="login-media">
          <video autoPlay loop muted>
            <source src={`${process.env.PUBLIC_URL}/videos/login.mp4`} type="video/mp4" />
          </video>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="Username"
              name="Username"
              placeholder="Username"
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

            {/* Forgot Password Link */}
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <div className="button-group">
              <button type="submit">Login</button>
            </div>

            {/* Don't have an account? Signup Link */}
            <div className="signup-link">
              <p>Don't have an account? <Link to="/SignUp">Click here</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
