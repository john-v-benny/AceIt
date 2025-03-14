import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="title">
        <span>Ace-iT</span>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link>Features</Link>
        <Link className="login" to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
