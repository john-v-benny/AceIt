import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Features from "../Features/Features";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to ACEIT</h1>
      <p>Prepare for interviews with AI-powered feedback and mock sessions.</p>
      <Link to="/InterviewPage" className="btn">Get Started</Link>
      <Features/>
    </div>
  );
};

export default Home;
