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
        <button className="start">Get started</button>
      </div>
      <div className="video-container">
        <video>
          <source src=""></source>
        </video>
      </div>
    </div>
  );
};

export default Home;
