import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [skills, setSkills] = useState("");

  const handleInputChange = (e) => {
    setSkills(e.target.value);
  };

  const handleGetStarted = () => {
    if (!skills.trim()) {
      alert("Please enter your qualifications and skills.");
      return;
    }
  };

  return (
    <div className="Home">
      <div className="title">
        <p className="a">Cracking your dream job</p>
        <p className="b">Prepare for interviews with AI-powered feedback and mock sessions.</p>
        <div>
          <input
            className="text"
            type="text"
            placeholder="Enter your qualifications and skills"
            value={skills}
            onChange={handleInputChange}
          />
        </div>
        <Link to={{ pathname: "/InterviewPage", state: { skills } }}>
          <button className="start" onClick={handleGetStarted}>
            Get started
          </button>
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