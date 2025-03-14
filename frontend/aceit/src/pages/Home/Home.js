import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Features from "../Features/Features";

const Home = () => {
  return (
    <div className="Home">
      <div className="title">
        <p className="a">Cracking your dream job</p>
        <p className="b">Prepare for interviews with AI-powered feedback and mock sessions.</p>
        <Link to="/InterviewPage">
          <button className="start">Get started</button>
        </Link>
      </div>
      <div className="video-container">
        <video autoPlay loop muted>
          <source src={`${process.env.PUBLIC_URL}/videos/login.mp4`} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Home;

