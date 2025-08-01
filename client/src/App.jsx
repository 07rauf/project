import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
       <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;