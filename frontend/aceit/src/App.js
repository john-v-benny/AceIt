import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Features from "./pages/Features/Features";
import InterviewPage from "./pages/InterviewPage/InterviewPage";
import SignUp from "./pages/Authentication/SignUp/SignIn";
import "./SignUp.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Home />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
<<<<<<< HEAD
      </Routes> */}
=======
        <Route path="/InterviewPage" element={<InterviewPage />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
>>>>>>> 99fc2914439699c09023ce367fa39da067399dae
    </Router>
  );
};

export default App;
