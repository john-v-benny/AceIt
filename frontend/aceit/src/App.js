import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Features from "./pages/Features/Features";
import InterviewPage from "./pages/InterviewPage/InterviewPage";
import SignUp from "./pages/Authentication/SignUp/SignUp.js"
import Login from "./pages/Authentication/Login/Login";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/InterviewPage" element={<InterviewPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </Router>
        
  );
};

export default App;
