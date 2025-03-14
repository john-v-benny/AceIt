import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./FeatureCard.css";

const FeatureCard = ({ title, description, isChart }) => {
  const [showChart, setShowChart] = useState(false);

  const toggleChart = () => {
    if (isChart) setShowChart(!showChart);
  };

  const chartData = {
    labels: ["Confidence", "Clarity", "Relevance", "Technical", "Communication"],
    datasets: [
      {
        data: [80, 70, 85, 90, 75],
        backgroundColor: ["#ff0000", "#cc0000", "#990000", "#660000", "#330000"],
      },
    ],
  };

  return (
    <div className="feature-card" onClick={toggleChart}>
      <h3>{title}</h3>
      <p>{description}</p>
      {showChart && isChart && (
        <div className="chart-container">
          <Pie data={chartData} />
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
