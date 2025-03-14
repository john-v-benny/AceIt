import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Features from "./pages/Features/Features";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Home />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
      </Routes> */}
    </Router>
  );
};

export default App;
