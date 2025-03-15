import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./InterviewPage.css";

const InterviewPage = () => {
  const [questions, setQuestions] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the question index
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const location = useLocation();
  const skills = location.state?.skills || "";

  const fetchQuestions = async () => {
    try {
      console.log("Sending skills to backend:", skills);
      const response = await axios.post("http://127.0.0.1:8000/api/generate/", {
        skills: skills.split(","),
      });
      console.log("Backend response:", response.data);

      if (response.data.questions?.length > 0) {
        setQuestions(response.data.questions);
        setCurrentQuestionIndex(0); // Start from the first question
      } else {
        setQuestions(["No questions available for the provided skills."]);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions(["Failed to fetch questions. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  const sendFrameForAnalysis = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/analyze-posture/", {
        image: imageData,
      });
      setFeedback(response.data.feedback);
    } catch (error) {
      console.error("Error analyzing posture:", error);
    }
  };

  useEffect(() => {
    if (skills) {
      fetchQuestions();
      startWebcam();
    }

    return stopWebcam;
  }, [skills]);

  useEffect(() => {
    const interval = setInterval(() => {
      sendFrameForAnalysis();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => 
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <div className="container">
      <div className="left-section">
        <div className="section-1">
          <video ref={videoRef} autoPlay playsInline className="video"></video>
        </div>
        <div className="section-2">
          <h2>Interview Questions</h2>
          {loading ? (
            <p>Loading questions...</p>
          ) : (
            <div>
              <p>{questions[currentQuestionIndex]}</p>
              <button onClick={handleNextQuestion} disabled={currentQuestionIndex >= questions.length - 1}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="right-section">
        <div className="section-3">
          <span>Posture and Gesture</span>
        </div>
        <div className="section-4">
          <span>Speech</span>
        </div>
        <div className="section-5">
          <span>Reference links</span>
          <p><a href="https://leetcode.com/">Leetcode for coding challenges</a></p>
          <p><a href="https://www.youtube.com/watch?v=gDN7cJ3Rt80">Training for Interview</a></p>
          <p><a href="https://www.youtube.com/watch?v=G3e-cpL7ofc&t=19111s">Html and css beginner classes</a></p>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
