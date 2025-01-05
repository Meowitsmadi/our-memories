import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import HomeNavbar from "./HomeNavbar";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNewAlbumClick = () => {
    navigate("/create-album");
  };

  return (
    <div>
       <HomeNavbar />
      <h2>Dashboard</h2>
      <button onClick={handleNewAlbumClick}>Create New Album</button>
    </div>
  );
};

export default Dashboard;
