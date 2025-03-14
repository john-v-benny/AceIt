import React from "react";
import FeatureCard from "./FeatureCard";
import "./Features.css";

const Features = () => {
  return (
    <div className="features-container">
      <FeatureCard title="AI Feedback" description="Instant analysis of your responses." isChart />
      <FeatureCard title="Mock Interviews" description="Practice with real-world scenarios." />
      <FeatureCard title="Timed Challenges" description="Improve your response time under pressure." />
    </div>
  );
};

export default Features;
