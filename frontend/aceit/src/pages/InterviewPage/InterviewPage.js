import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./InterviewPage.css"; // Import the CSS file

const InterviewPage = () => {
  const [question, setQuestion] = useState(""); // Stores the current question
  const [feedback, setFeedback] = useState([]); // Stores posture and speech feedback
  const videoRef = useRef(null); // Reference for the video element
  const [stream, setStream] = useState(null); // Stores the webcam stream

  // Fetch a new question from the backend
  const fetchQuestion = async () => {
    try {
      const response = await axios.get("/api/get-question");
      setQuestion(response.data.question);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  // Start webcam feed
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  // Send video frames to the backend for posture analysis
  const sendFrameForAnalysis = async () => {
    if (!videoRef.current) return;
  
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  
    const imageData = canvas.toDataURL("image/jpeg"); // Convert frame to Base64
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/analyze-posture/", { image: imageData });
      setFeedback(response.data.feedback); // Update feedback from backend
    } catch (error) {
      console.error("Error analyzing posture:", error);
    }
  };
  

  // Fetch a new question and start webcam when the component mounts
  useEffect(() => {
    fetchQuestion();
    startWebcam();

    // Cleanup: Stop the webcam stream when the component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]); // Add `stream` to the dependency array

  // Send frames for analysis at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      sendFrameForAnalysis();
    }, 5000); // Analyze posture every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {/* Left Section (Camera and Question) */}
      <div className="left-section">
        {/* Camera Feed Section */}
        <div className="section-1">
          <video ref={videoRef} autoPlay playsInline className="video"></video>
        </div>
        {/* Question Display Section */}
        <div className="section-2">
          <span>Interview Question</span>
          <button>Next</button>
          <p className="question">iki</p>
        </div>
      </div>
  
      {/* Right Section (Feedback) */}
      <div className="right-section">
        <div className="section-3">
          <span>Poster and Gesture</span>
        </div>
        <div className="section-4">
          <span>Speech</span>
        </div>
      </div>
    </div>
  );
  
};

export default InterviewPage;