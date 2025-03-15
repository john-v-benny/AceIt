import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./InterviewPage.css";

const InterviewPage = () => {
  const [questions, setQuestions] = useState([]); // Change to array
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const location = useLocation();
  const { skills } = location.state || { skills: "" };

  const fetchQuestions = async () => {
    try {
      console.log("Sending skills to backend:", skills);
      const response = await axios.post("http://127.0.0.1:8000/api/generate/", {
        skills: skills.split(","),
      });
      console.log("Backend response:", response.data);

      if (response.data.questions && response.data.questions.length > 0) {
        setQuestions(response.data.questions); // Store all questions
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
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
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
    fetchQuestions();
    startWebcam();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    const interval = setInterval(() => {
      sendFrameForAnalysis();
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="container">
      <div className="left-section">
        <div className="section">
          <h2>Camera Feed</h2>
          <video ref={videoRef} autoPlay playsInline className="video" />
        </div>
        <div className="section">
          <h2>Interview Questions</h2>
          {loading ? (
            <p>Loading questions...</p>
          ) : (
            <ul className="question-list">
              {questions.map((q, index) => (
                <li key={index} className="question-item">
                  {q}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="right-section">
        <div className="section">
          <h2>Feedback</h2>
          <ul className="feedback-list">
            {feedback.map((item, index) => (
              <li key={index} className="feedback-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  );
};

export default InterviewPage;
