import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API requests
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username: formData.email, // Assuming email is used as the username
        password: formData.password,
      });

      // Store token in localStorage
      localStorage.setItem("access_token", response.data.token.access);
      localStorage.setItem("refresh_token", response.data.token.refresh);

      console.log("Login Successful", response.data);
      navigate("/dashboard"); // Redirect user after successful login
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-media">
          <video autoPlay loop muted>
            <source src={`${process.env.PUBLIC_URL}/videos/login.mp4`} type="video/mp4" />
          </video>
        </div>

        <div className="login-form">
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
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

            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <div className="button-group">
              <button type="submit">Login</button>
            </div>

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
