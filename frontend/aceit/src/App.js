import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Features from "./pages/Features/Features";
import InterviewPage from "./pages/InterviewPage/InterviewPage";
<<<<<<< HEAD
import SignUp from "./pages/Authentication/SignUp/SignUp.js"
=======
import Login from "./pages/Authentication/Login/Login";
import SignUp from "./pages/Authentication/SignUp/SignIn";

>>>>>>> 2d104b47a7414b64654ac605aa0e621f0083db72

const App = () => {
  return (
    <Router>
      <Navbar />
      <Home />
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
