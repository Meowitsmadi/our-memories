import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import Signup from "./components/Signup";
import CreateAlbum from "./scrapbook_components/CreateAlbum";
import './App.css'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
     const token = localStorage.getItem("access_token");
     if (!token) {
        navigate("/"); // Redirect to home if token is missing
        return;
     }

     try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decoded.exp < currentTime) {
           localStorage.removeItem("access_token"); // Clear expired token
           navigate("/"); // Redirect to home if token is expired
        }
     } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/"); // Redirect to home if token is invalid
     }
  }, [navigate]);

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/create-album"
          element={
            <ProtectedRoute>
              <CreateAlbum />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App
