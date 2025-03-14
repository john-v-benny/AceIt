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

    const imageData = canvas.toDataURL("image/jpeg");

    try {
      const response = await axios.post("/api/analyze-posture", { image: imageData });
      setFeedback(response.data.feedback); // Update feedback from the backend
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

  return React.createElement(
    "div",
    { className: "container" },
    // Left Section (Camera and Question)
    React.createElement(
      "div",
      { className: "left-section" },
      // Camera Feed Section
      React.createElement(
        "div",
        { className: "section" },
        React.createElement("h2", null, "Camera Feed"),
        React.createElement("video", {
          ref: videoRef,
          autoPlay: true,
          playsInline: true,
          className: "video",
        })
      ),
      // Question Display Section
      React.createElement(
        "div",
        { className: "section" },
        React.createElement("h2", null, "Interview Question"),
        React.createElement("p", { className: "question" }, question)
      )
    ),
    // Right Section (Feedback)
    React.createElement(
      "div",
      { className: "right-section" },
      React.createElement(
        "div",
        { className: "section" },
        React.createElement("h2", null, "Feedback"),
        React.createElement(
          "ul",
          { className: "feedback-list" },
          feedback.map((item, index) =>
            React.createElement(
              "li",
              { key: index, className: "feedback-item" },
              item
            )
          )
        )
      )
    )
  );
};

export default InterviewPage;