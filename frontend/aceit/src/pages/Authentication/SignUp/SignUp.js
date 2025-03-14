import React, { useState } from "react";
import "./SignUp.css"; 

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
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
          </form>

          {/* Buttons Section */}
          <div className="button-group">
            <button className="btn-login">Login</button>
            <button className="btn-signin">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
