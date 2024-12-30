import React, { useContext } from "react";
// import { AuthContext } from "./AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.username}!</p>
      {/* Add more protected content here */}
    </div>
  );
};

export default Dashboard;
