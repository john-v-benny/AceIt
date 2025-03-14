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
        <Link>Home</Link>
        <Link>Features</Link>
        <Link className="login">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
