import React from "react";
import ProgressCharts from "../components/ProgressCharts";
import "../styles/ModernCss.css"; // Your ShutterSpace theme

const Dashboard = () => {
  return (
    <div className="signup-container" style={{ flexDirection: "column", gap: "32px" }}>
      <div className="signup-card" style={{ maxWidth: "800px", marginBottom: "20px" }}>
        <h2 className="signup-title">📊 Learning Progress Dashboard</h2>
        <p style={{ textAlign: "center", color: "#aaa", fontSize: "15px", marginTop: "-10px" }}>
          Track your goals, analyze trends, and stay motivated.
        </p>
      </div>

      <ProgressCharts />
    </div>
  );
};

export default Dashboard;
