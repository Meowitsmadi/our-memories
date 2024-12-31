import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div>
        <h2>Landing Page</h2>
      </div>
    </>
  );
};

export default LandingPage;